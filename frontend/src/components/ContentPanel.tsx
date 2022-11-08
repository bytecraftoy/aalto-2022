import { useState, FC } from 'react';
import { PromptCategoryBox } from './PromptCategoryBox';
import { generateText } from '../utils/generateContent';
import { PromptIOBox, PromptData } from './PromptIOBox';

//Provide access to MasterCategory through a parent callback
interface ContentPanelProps {
    getMasterCategory: () => string;
}

export const ContentPanel: FC<ContentPanelProps> = () => {
    const [category, setCategory] = useState('');
    const [promptBoxes, setPromptBoxes] = useState<PromptData[]>([]);

    const deletePromptBox = (id: string) =>
        setPromptBoxes((prev) => prev.filter((p) => p.id !== id));
    const addPromptBox = () =>
        setPromptBoxes((prev) => [
            ...prev,
            { id: crypto.randomUUID(), input: '', output: '' },
        ]);

    const generateAll = () => promptBoxes.forEach(generateOutput);
    const generateOutput = async (p: PromptData) => {
        setPromptOutput(p.id, await generateText(p.input, category));
    };

    const setPromptInput = (id: string, input: string) => {
        setPromptBoxes((prev) =>
            prev.map((o) =>
                o.id === id ? { id: id, input: input, output: o.output } : o
            )
        );
    };

    const setPromptOutput = (id: string, output: string) => {
        setPromptBoxes((prev) =>
            prev.map((o) =>
                o.id === id ? { id: id, input: o.input, output: output } : o
            )
        );
    };

    return (
        <div className="w-full px-4 py-12">
            <div className="mx-auto my-auto w-full max-w-6xl rounded-2xl bg-panel p-12 min-h-fit">
                <div className="flex flex-row justify-around items-center">
                    <PromptCategoryBox
                        category={category}
                        setCategory={setCategory}
                    />
                </div>
                <div className="flex flex-row justify-center items-center">
                    <button
                        className="rounded-lg bg-textfield text-textcolor h-16 min-h-fit font-medium text-xl px-4 text-center mx-6 mt-8 hover:bg-slate-500 transition-colors outline-none outline-offset-0 focus:outline-textcolor"
                        onClick={generateAll}
                    >
                        Generate content
                    </button>
                    <button
                        className="rounded-lg bg-textfield text-textcolor h-16 min-h-fit font-medium text-xl px-4 text-center mx-6 mt-8 hover:bg-slate-500 transition-colors outline-none outline-offset-0 focus:outline-textcolor"
                        onClick={addPromptBox}
                    >
                        Add box
                    </button>
                </div>
                <div className="flex flex-row flex-wrap justify-center items-center">
                    {promptBoxes.map((p) => {
                        return (
                            <PromptIOBox
                                key={p.id}
                                input={p.input}
                                output={p.output}
                                setInput={(s: string) =>
                                    setPromptInput(p.id, s)
                                }
                                setOutput={(s: string) =>
                                    setPromptOutput(p.id, s)
                                }
                                generate={() => generateOutput(p)}
                                deleteSelf={
                                    promptBoxes.length > 1
                                        ? () => deletePromptBox(p.id)
                                        : null
                                }
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
