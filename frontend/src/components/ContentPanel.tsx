import { useState, FC } from 'react';
import { PromptCategoryBox } from './PromptCategoryBox';
import { generateText } from '../utils/generateContent';
import { PromptIOBox, PromptData } from './PromptIOBox';
import { Button } from './Button';

//Provide access to MasterCategory through a parent callback
interface ContentPanelProps {
    getMasterCategory: () => string;
}

export const ContentPanel: FC<ContentPanelProps> = () => {
    //Component state consists of category prompt, and N multiprompts (id, input, output)
    const [category, setCategory] = useState('');
    const [promptBoxes, setPromptBoxes] = useState<PromptData[]>([]);

    //Callbacks to add or remove PromptIOBoxes to the panels
    const deletePromptBox = (id: string) => {
        setPromptBoxes((prev) => prev.filter((p) => p.id !== id));
    };
    const addPromptBox = () => {
        const newBox = { id: crypto.randomUUID(), input: '', output: '' };
        setPromptBoxes((prev) => [...prev, newBox]);
    };

    //Callbacks to asynchronously fetch AI data from backend
    const generateAll = () => promptBoxes.forEach(generateOutput);
    const generateOutput = async (p: PromptData) => {
        setPromptOutput(p.id, await generateText(p.input, category));
    };

    //Callback to modify the output area of a PromptIOBox by id
    const setPromptInput = (id: string, input: string) => {
        //Replace the box that matches id with a new object where input is changed.
        setPromptBoxes((prev) =>
            prev.map((o) =>
                o.id === id ? { id: id, input: input, output: o.output } : o
            )
        );
    };

    //Callback to modify the input area of a PromptIOBox by id
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
                    <Button onClick={generateAll} name="Generate content" />
                    <Button onClick={addPromptBox} name="Add box" />
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
