import { useState, FC, useEffect } from 'react';
import { generateText } from '../../utils/generateContent';
import {
    exportJson,
    downloadJson,
    exportXlsx,
    downloadXlsx,
} from '../../utils/exportContent';
import { PromptData } from '../PromptIOBox';
import { Surface } from '../Surface';
import { ContentPanelHeader } from './ContentPanelHeader';
import { ContentPanelPrompts } from './ContentPanelPrompts';
import { ContentPanelActions } from './ContentPanelActions';
import { InputSchema } from '../PromptIOBox';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../utils/hooks';
import { updatePanel } from '../../reducers/panelReducer';

//Provide access to MasterCategory through a parent callback
interface ContentPanelProps {
    id: string;
    initialCategory: string;
    initialPrompts: PromptData[];
}

/**
 * A standalone panel for creating AI content.
 *
 */
export const ContentPanel: FC<ContentPanelProps> = ({
    id,
    initialCategory,
    initialPrompts,
}) => {
    // Redux dispatch
    const dispatch = useAppDispatch();

    //Component state consists of category prompt, and N multiprompts (id, input, output)
    const [category, setCategory] = useState<string>(initialCategory);
    const [promptBoxes, setPromptBoxes] =
        useState<PromptData[]>(initialPrompts);
    const [loading, setLoading] = useState<boolean>(false);

    //Callback to create new boxes in the panel
    const addPromptBox = () => {
        const newBox = { id: uuidv4(), input: '', output: '', locked: false };
        setPromptBoxes((prev) => [...prev, newBox]);
    };

    // Generates all the IO boxes that are not locked
    const generateAll = async () => {
        // Start the loading spinner
        setLoading(() => true);

        // Map of <id, output> for content panels that are generated
        const generated: Map<string, string> = new Map();

        // Goes through the promptboxes and adds the map a new entry for ids which are not locked
        for (const p of promptBoxes) {
            // Generate if the prompt is not locked and input is valid
            if (!p.locked && InputSchema.safeParse(p.input).success) {
                const output: string = await generateText(
                    p.id,
                    p.input,
                    category
                );
                generated.set(p.id, output);
            }
        }

        // Sets all the promptboxes in a 1 setState call.
        setPromptBoxes((prev) =>
            prev.map((p) => {
                if (generated.has(p.id)) {
                    const mapOutput = generated.get(p.id);
                    if (mapOutput) return { ...p, output: mapOutput };
                }

                return p;
            })
        );
    };

    /**
     * A callback function for the setPromptBoxes which updates
     * the redux store after the content generation
     */
    useEffect(() => {
        if (loading) {
            // Create the new panel object
            const panel = {
                id,
                category,
                prompts: promptBoxes,
            };

            // Update the redux store
            dispatch(updatePanel(panel));
            // Take out the loading spinner
            setLoading(() => false);
        }
    }, [promptBoxes]);

    // Generates single output
    const generateOutput = async (p: PromptData) => {
        setLoading(() => true);
        setPromptOutput(p.id, await generateText(p.id, p.input, category));
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
        const link = await exportXlsx(category, promptBoxes);
        if (link) downloadXlsx(link);
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
                        exportJson={jsonExport}
                        exportExcel={excelExport}
                    />
                </Surface>
            </div>
            {/* Loading spinner */}
            {loading && (
                <div className="fixed inset-1/2">
                    <Loader />
                </div>
            )}
        </div>
    );
};
