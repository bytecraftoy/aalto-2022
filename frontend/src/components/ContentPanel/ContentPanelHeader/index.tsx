import React from 'react';
import { PromptCategoryBox } from './PromptCategoryBox';
import { DropdownMenu } from '../../DropdownMenu';

/**
 * Top most part of the whole content panel.
 * Contains currently only place set set category box
 *
 */

interface ContentPanelHeaderProps {
    category: string;
    setCategory: (s: string) => void;

    setAddPopup: (b: boolean) => void;
    setOpenParams: (b: boolean) => void;
    setClearPopup: (b: boolean) => void;
    lockAll: (b: boolean) => void;
    flipLock: () => void;
    deleteEmpty: () => void;
    swapBoxes: () => void;

    saveState: (force?: boolean) => Promise<void>;
}

export const ContentPanelHeader: React.FC<ContentPanelHeaderProps> = ({
    category,
    setCategory,
    setAddPopup,
    setClearPopup,
    setOpenParams,
    deleteEmpty,
    swapBoxes,
    lockAll,
    flipLock,
    saveState,
}) => {
    return (
        <div className="flex flex-row justify-center items-center h-16 px-4 mt-6">
            <PromptCategoryBox category={category} setCategory={setCategory} />
            <div data-testid="panel-settings" className="h-full pl-2 z-[15]">
                <DropdownMenu
                    icon="Cog6Tooth"
                    items={[
                        {
                            action: () => setOpenParams(true),
                            icon: 'AdjustmentsHorizontalIcon',
                            name: 'Parameters',
                            tooltip: 'Adjust AI settings',
                        },
                        {
                            action: () => saveState(true),
                            icon: 'DocumentCheckIcon',
                            name: 'Save',
                            tooltip: 'Save panel data',
                        },
                        {
                            action: () => setAddPopup(true),
                            icon: 'CubeIcon',
                            name: 'Add boxes',
                            tooltip: 'Add multiple boxes with optional input',
                        },
                        {
                            action: swapBoxes,
                            icon: 'ArrowsUpDownIcon',
                            name: 'Swap I/O',
                            tooltip: 'Swap the contents of inputs and outputs',
                        },
                        {
                            action: () => lockAll(true),
                            icon: 'LockClosedIcon',
                            name: 'Lock all',
                            tooltip: 'Lock all boxes',
                        },
                        {
                            action: () => lockAll(false),
                            icon: 'LockOpenIcon',
                            name: 'Unlock all',
                            tooltip: 'Unlock all boxes',
                        },
                        {
                            action: flipLock,
                            icon: 'ArrowPathIcon',
                            name: 'Flip lock',
                            tooltip:
                                'Unlock locked boxes, and lock unlocked boxes',
                        },
                        {
                            action: deleteEmpty,
                            icon: 'MinusCircleIcon',
                            name: 'Remove empty',
                            tooltip: 'Delete boxes that have no content',
                        },
                        {
                            action: () => setClearPopup(true),
                            icon: 'TrashIcon',
                            name: 'Clear boxes',
                            tooltip: 'Clear non-locked inputs',
                        },
                    ]}
                />
            </div>
        </div>
    );
};
