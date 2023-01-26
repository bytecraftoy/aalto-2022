import { NavigationContainer } from './components/NavigationContainer';
import { Routes } from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { UserContainer } from './components/UserContainer';

/**
 * The base react component
 * Contains headers, page background and
 * Page title. Used to control the top level
 * layout of the page.
 */
function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavigationContainer>
                    <UserContainer>
                        <Routes />
                    </UserContainer>
                </NavigationContainer>
            </BrowserRouter>
        </Provider>
    );
}

export { App };
