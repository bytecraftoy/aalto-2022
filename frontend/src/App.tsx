import { ContentPanel } from './components/ContentPanel';
import { NavigationContainer } from './components/NavigationContainer';

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
            {/* Current view of the page. Could be an about page or a ContentPanel */}
            <div className="App bg-neutral-99 h-full flex flex-col justify-start items-center">
                <ContentPanel getMasterCategory={() => ''} />
            </div>
        </NavigationContainer>
    );
}

export { App };
