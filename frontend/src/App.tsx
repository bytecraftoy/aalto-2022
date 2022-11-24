//import React, { useState } from 'react';
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
            <div className="App bg-neutral-99 h-full justify-start items-center flex flex-col">
                <ContentPanel getMasterCategory={() => ''} />
            </div>
        </NavigationContainer>
    );
}

export { App };
