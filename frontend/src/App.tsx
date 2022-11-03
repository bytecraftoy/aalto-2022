import React, { useState } from 'react';
import { ContentPanel } from './components/ContentPanel';
import { PromptCategoryBox } from './components/PromptCategoryBox';
import { InfoModal } from './components/TailwindTestModal';
import { PromptIOBox } from './components/PromptIOBox';
import { createPrompt } from './utils/createPrompt';
import { apiFetch } from './utils/apiFetch';

function App() {
    const [category, setCategory] = useState('');

    //Probably move these later
    const [output, setOutput] = useState('');
    const [input, setInput] = useState('');

    const generateContent = async () => {
        try {
            const t = await apiFetch('/mirror/', {
                method: 'POST',
                body: createPrompt(category, input),
            });
            setOutput(t);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="App bg-react min-h-screen justify-start items-center flex flex-col">
            <header className="App-header text-white text-2xl py-10 px-4">
                <div className="">
                    <h1 className="App-logo font-medium text-4xl">
                        Aalto-2022 AI assisted game content creator
                    </h1>
                </div>
            </header>
            <InfoModal />
            <ContentPanel>
                <div>
                    <div className="flex flex-row justify-around items-center">
                        <PromptCategoryBox
                            category={category}
                            setCategory={setCategory}
                        />
                    </div>
                    <div className="flex flex-row justify-around items-center">
                        <PromptIOBox
                            input={input}
                            setInput={setInput}
                            output={output}
                            setOutput={setOutput}
                        />
                    </div>
                    <div className="flex flex-row justify-end items-end">
                        <button
                            className="rounded-lg bg-textfield text-textcolor h-16 min-h-fit font-medium text-xl px-4 text-center mx-6 mt-8 hover:bg-slate-500 transition-colors outline-none outline-offset-0 focus:outline-textcolor"
                            onClick={generateContent}
                        >
                            Generate content
                        </button>
                    </div>
                </div>
            </ContentPanel>
        </div>
    );
}

export { App };
