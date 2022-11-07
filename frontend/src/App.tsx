import React, { useState } from 'react';
//import { CodeBracketIcon } from "@heroicons/react/24/outline";
import { ContentPanel } from './components/ContentPanel';
import { PromptCategoryBox } from './components/PromptCategoryBox';
import { PromptIOBox } from './components/PromptIOBox';
import { apiFetch } from './utils/apiFetch';

function App() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const generateContent = async () => {
        try {
            const t = await apiFetch('/mirror/', {
                method: 'POST',
                body: input,
            });
            setOutput(t);
        } catch (e) {
            console.error(e);
        }
    };

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
                        <div className="flex flex-row justify-around items-center">
                            <PromptCategoryBox />
                        </div>
                        <div>
                            <PromptIOBox
                                input={input}
                                setInput={setInput}
                                output={output}
                                setOutput={setOutput}
                            />
                        </div>
                        <div>
                            <button onClick={generateContent}>
                                {' '}
                                Generate content{' '}
                            </button>
                        </div>
                    </div>
                </ContentPanel>
            </div>
        </div>
    );
}

export { App };
