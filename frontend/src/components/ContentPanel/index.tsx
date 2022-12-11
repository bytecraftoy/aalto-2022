import { useState, FC } from 'react';
import { generateText } from '../../utils/generateContent';
import { exportJson, downloadJson } from '../../utils/exportContent';
import { PromptData } from '../PromptIOBox';
import { Surface } from '../Surface';
import { ContentPanelHeader } from './ContentPanelHeader';
import { ContentPanelPrompts } from './ContentPanelPrompts';
import { ContentPanelActions } from './ContentPanelActions';
import classNames from 'classnames';
import { Loader } from '../Loader';
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
        { id: uuidv4(), input: '', output: '', locked: false },
    ]);
    const [loading, setLoading] = useState<boolean>(false);

    //Callback to create new boxes in the panel
    const addPromptBox = () => {
        const newBox = { id: uuidv4(), input: '', output: '', locked: false };
        setPromptBoxes((prev) => [...prev, newBox]);
    };

    //Adds n ammount of new boxes in the panel instead of 1
    const addPromptBoxes = (n: number) => {
        for (let i = 0; i < n ;i++){
            addPromptBox();
        }
    };

    //Callbacks to asynchronously fetch AI data from backend
    const generateAll = () => {
        promptBoxes.forEach((p) => {
            if (!p.locked) {
                generateOutput(p);
            }
        });
    };
    const generateOutput = async (p: PromptData) => {
        setLoading(() => true);
        setPromptOutput(p.id, await generateText(p.id, p.input, category));
        setLoading(() => false);
    };

    //Callback to modify the input area of a PromptIOBox by id
    const setPromptOutput = (id: string, output: string) => {
        setPromptBoxes((prev) =>
            prev.map((o) => (o.id === id ? { ...o, output: output } : o))
        );
    };

    // Locks a prompt box, so that it is not generated with generate all
    const lockPrompt = (id: string) => {
        setPromptBoxes((prev) =>
            prev.map((box) =>
                box.id === id ? { ...box, locked: !box.locked } : box
            )
        );
    };

    //Callback to export the category, and all inputs / outputs in json
    const jsonExport = async () => {
        const link = await exportJson(category, promptBoxes);
        if (link) downloadJson(link);
    };

    //Callback to export outputs in excel
    //Not implemented, instead just call jsonExport
    const excelExport = async () => {
        await jsonExport();
    };

    return (
        //Take up full space, and center the content panel in it
        <div className="relative w-full h-full">
            <div
                className={classNames(
                    'w-full px-4 py-16 flex flex-row justify-around items-center',
                    { 'opacity-50 pointer-events-none': loading }
                )}
            >
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
                        lockPrompt={lockPrompt}
                    />

                    {/* Bottom bar containing content panel actions */}
                    <ContentPanelActions
                        generateAll={generateAll}
                        addPromptBoxes={addPromptBoxes}
                        exportJson={jsonExport}
                        exportExcel={excelExport}
                    />
                </Surface>
            </div>
            {/* Loading spinner */}
            {loading && (
                <div className="absolute inset-1/2">
                    <Loader />
                </div>
            )}
        </div>
    );
};
