import { FC, useState } from 'react';
import {
    exportJson,
    downloadJson,
    exportXlsx,
    downloadXlsx,
    panelExport,
} from '../../utils/exportContent';
import { Surface } from '../Surface';
import { PromptData } from '../../utils/types';
import { ContentPanelHeader } from './ContentPanelHeader';
import { ContentPanelPrompts } from './ContentPanelPrompts';
import { ContentPanelActions } from './ContentPanelActions';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { usePanel } from './hooks';
import { PopUpWindow } from './ContentPanelPrompts/PopUpWindow';
import { ParameterDrawer } from '../ParameterDrawer';

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
    const {
        theme,
        category,
        promptBoxes,
        loading,
        popupOpen,
        setCategory,
        setPromptBoxes,
        generateAll,
        generateOutput,
        setPromptOutput,
        lockPrompt,
        addPromptBox,
        addPromptBoxes,
        saveState,
        setPopup,
    } = usePanel(initialPrompts, initialCategory, id);

    //Callback to export the category, and all inputs / outputs in json
    const jsonExport = async () => {
        const data: panelExport = {
            theme,
            panel: {
                id,
                category,
                prompts: promptBoxes,
            },
        };

        const link = await exportJson(data);
        if (link) downloadJson(link);
    };

    //Callback to export outputs in excel
    //Not implemented, instead just call jsonExport
    const excelExport = async () => {
        const data: panelExport = {
            theme,
            panel: {
                id,
                category,
                prompts: promptBoxes,
            },
        };

        const link = await exportXlsx(data);
        if (link) downloadXlsx(link);
    };

    // Opens ParameterDrawer
    const [open, setOpen] = useState(false);

    return (
        //Take up full space, and center the content panel in it
        <div className="relative w-full h-full flex-1">
            <ParameterDrawer open={open} setOpen={setOpen} />
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
                        setPopup={setPopup}
                        saveState={saveState}
                        setOpen={setOpen}
                    />

                    {/* Pop-up window used to add n boxes. Hidden by default*/}
                    <PopUpWindow
                        addPromptBoxes={addPromptBoxes}
                        setPopup={setPopup}
                        popupOpen={popupOpen}
                    />

                    {/* IO TExtfields: Prompts of the content panel */}
                    <ContentPanelPrompts
                        promptBoxes={promptBoxes}
                        setPromptBoxes={setPromptBoxes}
                        generateOutput={generateOutput}
                        setPromptOutput={setPromptOutput}
                        addPromptBox={addPromptBox}
                        lockPrompt={lockPrompt}
                        saveState={saveState}
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
