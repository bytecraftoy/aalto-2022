import React from 'react';
import { PromptData } from './ContentPanelPrompts/PromptIOBox';
import { Surface } from '../Surface';
import classNames from 'classnames';
import { ParameterDrawer } from '../ParameterDrawer';

/**
 * An about page explaining the usage of the application as well as
 * an input field for choosing a theme for the currently selected project
 *
 */
export const AboutPage = () => {
    const {
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
        const link = await exportJson(category, promptBoxes);
        if (link) downloadJson(link);
    };

    //Callback to export outputs in excel
    //Not implemented, instead just call jsonExport
    const excelExport = async () => {
        const link = await exportXlsx(category, promptBoxes);
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
