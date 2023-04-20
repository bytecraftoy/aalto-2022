import { FC, useState, useEffect } from 'react';
import {
    exportJson,
    downloadJson,
    exportXlsx,
    downloadXlsx,
    panelExport,
} from '../../utils/exportContent';
import { Surface } from '../Surface';
import { ContentPanelHeader } from './ContentPanelHeader';
import { ContentPanelPrompts } from './ContentPanelPrompts';
import { ContentPanelActions } from './ContentPanelActions';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { usePanel } from './hooks';
import { MultipleBoxPopup } from './ContentPanelPrompts/MultipleBoxPopup';
import { ParameterDrawer } from '../ParameterDrawer';

// State stored in redux store
interface ContentPanelProps {
    id: string;
}

/**
 * A standalone panel for creating AI content.
 *
 */
export const ContentPanel: FC<ContentPanelProps> = ({ id }) => {
    const {
        theme,
        category,
        presetNames,
        promptBoxes,
        advancedMode,
        overrideTheme,
        parameters,
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
        selectPreset,
        setCustomParameters,
        setAdvancedMode,
        setOverrideTheme,
    } = usePanel(id);

    // Current state of this panel in exportable format
    const exportData: panelExport = {
        theme,
        panel: {
            id,
            category,
            prompts: promptBoxes,
            parameters,
            advancedMode,
            overrideTheme,
        },
    };

    //Callback to export the category, and all inputs / outputs in json
    const jsonExport = async () => {
        const link = await exportJson(exportData);
        if (link) downloadJson(link);
    };

    //Callback to export outputs in excel
    const excelExport = async () => {
        const link = await exportXlsx(exportData);
        if (link) downloadXlsx(link);
    };

    // Opens ParameterDrawer
    const [open, setOpen] = useState(false);

    // Autosave when the drawer is closed
    useEffect(() => {
        if (!open) saveState();
    }, [open]);

    const hasCustomParameters: boolean = parameters != theme.globalParameters;

    return (
        //Take up full space, and center the content panel in it
        <div className="relative w-full h-full flex-1">
            <ParameterDrawer
                overrideTheme={overrideTheme}
                advancedMode={advancedMode}
                setOverrideTheme={setOverrideTheme}
                setAdvancedMode={setAdvancedMode}
                setCustomParameters={setCustomParameters}
                presets={presetNames}
                selectPreset={selectPreset}
                preset={parameters}
                open={open}
                setOpen={setOpen}
            />
            <div
                className={classNames(
                    'w-full px-4 py-16 flex flex-row justify-around items-center',
                    { 'opacity-50 pointer-events-none': loading }
                )}
            >
                <Surface level={2} className="w-full max-w-6xl min-h-fit pt-4">
                    {/* Top most part of the content panel */}
                    <ContentPanelHeader
                        category={category}
                        setCategory={setCategory}
                        setPopup={setPopup}
                        saveState={saveState}
                        setOpen={setOpen}
                        hasCustomParameters={hasCustomParameters}
                    />

                    {/* Pop-up window used to add n boxes. Hidden by default*/}
                    <MultipleBoxPopup
                        popupOpen={popupOpen}
                        setPopup={setPopup}
                        addPromptBoxes={addPromptBoxes}
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
