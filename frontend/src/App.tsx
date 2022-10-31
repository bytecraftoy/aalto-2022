import React from 'react';
//import { CodeBracketIcon } from "@heroicons/react/24/outline";
import { ContentPanel } from './components/ContentPanel';
import { PromptCategoryBox } from './components/PromptCategoryBox';
import { PromptIOBox } from './components/PromptIOBox';

function App() {
    return (
        <div className="App bg-react min-h-screen justify-start items-center flex flex-col">
            <header className="App-header text-white text-2xl py-10">
                <div className="">
                    <h1 className="App-logo font-medium text-4xl">
                        Aalto-2022 AI assisted game content creator
                    </h1>
                </div>
            </header>
            <div className="min-w-full py-2">
                <ContentPanel>
                    <div>
                        <div className="flex flex-row justify-center items-center">
                            <PromptCategoryBox />
                        </div>
                        <div>
                            <PromptIOBox />
                        </div>
                    </div>
                </ContentPanel>
            </div>
        </div>
    );
}

export { App };
