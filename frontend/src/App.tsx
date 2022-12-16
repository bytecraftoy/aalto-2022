import { NavigationContainer } from './components/NavigationContainer';
import { Routes } from './Routes';

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
        <NavigationContainer>
            <Routes />
        </NavigationContainer>
    );
}

export { App };
