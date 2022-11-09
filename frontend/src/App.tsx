//import React, { useState } from 'react';
import { ContentPanel } from './components/ContentPanel';
import { InfoModal } from './components/TailwindTestModal';

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
        <div className="App bg-background min-h-screen justify-start items-center flex flex-col">
            <header className="App-header text-onBackground text-2xl py-10 px-4">
                <div className="">
                    <h1 className="App-logo font-medium text-4xl">
                        Aalto-2022 AI assisted game content creator
                    </h1>
                </div>
            </header>
            <InfoModal />
            <ContentPanel getMasterCategory={() => ''} />
        </div>
    );
}

export { App };
