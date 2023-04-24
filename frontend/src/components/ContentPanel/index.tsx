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
import { ClearBoxesPopup } from './ContentPanelPrompts/ClearBoxesPopup';
import { Tooltip } from '../Tooltip';
import { solidIcon } from '../../utils/icons';

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
        addPopupOpen,
        clearPopupOpen,
        setCategory,
        setPromptBoxes,
        generateAll,
        generateOutput,
        setPromptOutput,
        lockPrompt,
        addPromptBox,
        addPromptBoxes,
        clearPromptBoxes,
        saveState,
        setAddPopup,
        setClearPopup,
        deleteEmpty,
        lockAll,
        flipLock,
        swapBoxes,
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
    const [paramsOpen, setParamsOpen] = useState(false);

    // Autosave when the drawer is closed
    useEffect(() => {
        if (!open) saveState();
    }, [open]);

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
                open={paramsOpen}
                setOpen={setParamsOpen}
            />
            <div
                className={classNames(
                    'w-full px-4 py-16 flex flex-row justify-around items-center',
                    { 'opacity-50 pointer-events-none': loading }
                )}
            >
                <Surface level={2} className="w-full max-w-6xl min-h-fit pt-4">
                    {/* Custom settings indicator */}
                    <div className="flex flex-row justify-end px-6">
                        {overrideTheme && (
                            <Tooltip
                                text={'Using custom parameters'}
                                icon="InformationCircleIcon"
                                instant={true}
                                floatRight
                            >
                                {solidIcon(
                                    'AdjustmentsHorizontalIcon',
                                    'text-primary'
                                )}
                            </Tooltip>
                        )}
                    </div>

                    {/* Top most part of the content panel */}
                    <ContentPanelHeader
                        category={category}
                        setCategory={setCategory}
                        saveState={saveState}
                        setAddPopup={setAddPopup}
                        setClearPopup={setClearPopup}
                        setOpenParams={setParamsOpen}
                        deleteEmpty={deleteEmpty}
                        lockAll={lockAll}
                        flipLock={flipLock}
                        swapBoxes={swapBoxes}
                    />

                    {/* Pop-up window used to add n boxes. Hidden by default*/}
                    <MultipleBoxPopup
                        popupOpen={addPopupOpen}
                        setPopup={setAddPopup}
                        addPromptBoxes={addPromptBoxes}
                    />

                    {/* Pop-up window confirming a delete action */}
                    <ClearBoxesPopup
                        open={clearPopupOpen}
                        setOpen={setClearPopup}
                        clear={clearPromptBoxes}
                    />

                    {/* IO TExtfields: Prompts of the content panel */}
                    <div className="max-h-[50rem] overflow-y-auto">
                        <ContentPanelPrompts
                            promptBoxes={promptBoxes}
                            setPromptBoxes={setPromptBoxes}
                            generateOutput={generateOutput}
                            setPromptOutput={setPromptOutput}
                            addPromptBox={addPromptBox}
                            lockPrompt={lockPrompt}
                            saveState={saveState}
                        />
                    </div>

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
