import { useState, FC } from 'react';
import { generateText } from '../../utils/generateContent';
import { exportJson, downloadJson } from '../../utils/exportContent';
import { PromptData } from '../PromptIOBox';
import { Surface } from '../Surface';
import { ContentPanelHeader } from './ContentPanelHeader';
import { ContentPanelPrompts } from './ContentPanelPrompts';
import { ContentPanelActions } from './ContentPanelActions';
import { v4 as uuidv4 } from 'uuid';

//Provide access to MasterCategory through a parent callback
interface ContentPanelProps {
    getMasterCategory: () => string;
}

/**
 * A standalone panel for creating AI content.
 *
 */
export const ContentPanel: FC<ContentPanelProps> = () => {
    //Component state consists of category prompt, and N multiprompts (id, input, output)
    const [category, setCategory] = useState('');
    const [promptBoxes, setPromptBoxes] = useState<PromptData[]>([
        { id: uuidv4(), input: '', output: '' },
    ]);

    //Callback to create new boxes in the panel
    const addPromptBox = () => {
        const newBox = { id: uuidv4(), input: '', output: '' };
        setPromptBoxes((prev) => [...prev, newBox]);
    };

    //Callbacks to asynchronously fetch AI data from backend
    const generateAll = () => promptBoxes.forEach(generateOutput);
    const generateOutput = async (p: PromptData) => {
        setPromptOutput(p.id, await generateText(p.id, p.input, category));
    };

    //Callback to modify the input area of a PromptIOBox by id
    const setPromptOutput = (id: string, output: string) => {
        setPromptBoxes((prev) =>
            prev.map((o) =>
                o.id === id ? { id: id, input: o.input, output: output } : o
            )
        );
    };

    //Callback to export the category, and all inputs / outputs in json
    const jsonExport = async () => {
        const link = await exportJson(category, promptBoxes);
        if (link) downloadJson(link);
    };

    //Callback to export outputs in excel
    const excelExport = async () => {
        const link = await exportJson(category, promptBoxes);
        if (link) window.open(link, '_blank');
    };

    return (
        //Take up full space, and center the content panel in it
        <div className="w-full px-4 py-16 flex flex-row justify-around items-center">
            <Surface
                level={2}
                className="w-full max-w-6xl min-h-fit rounded-2xl shadow-xl outline outline-1 outline-primary-90"
            >
                {/* Top most part of the content panel */}
                <ContentPanelHeader
                    category={category}
                    setCategory={setCategory}
                />

                {/* IO TExtfields: Prompts of the content panel */}
                <ContentPanelPrompts
                    promptBoxes={promptBoxes}
                    setPromptBoxes={setPromptBoxes}
                    generateOutput={generateOutput}
                    setPromptOutput={setPromptOutput}
                    addPromptBox={addPromptBox}
                />

                {/* Bottom bar containing content panel actions */}
                <ContentPanelActions
                    generateAll={generateAll}
                    exportJson={jsonExport}
                    exportExcel={excelExport}
                />
            </Surface>
        </div>
    );
};
