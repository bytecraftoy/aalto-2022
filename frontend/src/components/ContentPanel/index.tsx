import { useState, FC } from 'react';
import { generateText } from '../../utils/generateContent';
import { PromptData } from '../PromptIOBox';
import { CustomButton } from '../Button';
import { Surface } from '../Surface';
import { ContentPanelHeader } from './ContentPanelHeader';
import { ContentPanelPrompts } from './ContentPanelPrompts';

//Provide access to MasterCategory through a parent callback
interface ContentPanelProps {
    getMasterCategory: () => string;
}

export const ContentPanel: FC<ContentPanelProps> = () => {
    //Component state consists of category prompt, and N multiprompts (id, input, output)
    const [category, setCategory] = useState('');
    const [promptBoxes, setPromptBoxes] = useState<PromptData[]>([]);

    const addPromptBox = () => {
        const newBox = { id: crypto.randomUUID(), input: '', output: '' };
        setPromptBoxes((prev) => [...prev, newBox]);
    };

    //Callbacks to asynchronously fetch AI data from backend
    const generateAll = () => promptBoxes.forEach(generateOutput);
    const generateOutput = async (p: PromptData) => {
        setPromptOutput(p.id, await generateText(p.input, category));
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
        <div className="w-full px-4 py-12 ">
            <Surface
                level={1}
                className="w-full max-w-6xl rounded-2xl min-h-fit shadow-md border border-black border-opacity-10"
            >
                <div className="mx-auto my-auto w-full max-w-6xl rounded-2xl p-12 min-h-fit">
                    {/* Top most part of the content panel */}
                    <ContentPanelHeader
                        category={category}
                        setCategory={setCategory}
                    />

                    <div className="flex flex-row justify-center items-center">
                        <CustomButton
                            onClick={generateAll}
                            name="Generate content"
                            color="primary"
                        />
                        <CustomButton
                            onClick={addPromptBox}
                            name="Add box"
                            color="primary"
                        />
                    </div>

                    {/* IO TExtfields: Prompts of the content panel */}
                    <ContentPanelPrompts
                        promptBoxes={promptBoxes}
                        setPromptBoxes={setPromptBoxes}
                        generateOutput={generateOutput}
                        setPromptOutput={setPromptOutput}
                    />
                </div>
            </Surface>
        </div>
    );
};
