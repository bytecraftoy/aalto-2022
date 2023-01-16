import { NavigationContainer } from './components/NavigationContainer';
import { Routes } from './Routes';
import { BrowserRouter } from 'react-router-dom';

/**
 * The base react component
 * Contains headers, page background and
 * Page title. Used to control the top level
 * layout of the page.
 */
function App() {
    //Unused for now, will be important later
    //const [masterCategory, setMasterCategory] = useState('');

    return (
        <BrowserRouter>
            <NavigationContainer>
                <Routes />
            </NavigationContainer>
        </BrowserRouter>
    );
}

export { App };
