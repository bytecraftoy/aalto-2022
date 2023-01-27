import { NavigationContainer } from './components/NavigationContainer';
import { Routes } from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { EventBus } from './utils/eventBus';
import { backendURL } from './utils/backendURL';

/**
 * The base react component
 * Contains headers, page background and
 * Page title. Used to control the top level
 * layout of the page.
 */
function App() {
    // Function for log out, i.e., emptying the cookies.
    async function onCustomEvent() {
        await fetch(`${backendURL}/api/user/logout`, {
            method: 'POST',
            credentials: 'include',
        });
    }

    // Adds event listener for logout events and logouts user when the evne tis fired
    useEffect(() => {
        EventBus.on('logout', onCustomEvent);

        return () => {
            EventBus.remove('logout', onCustomEvent);
        };
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavigationContainer>
                    <Routes />
                </NavigationContainer>
            </BrowserRouter>
        </Provider>
    );
}

export { App };
