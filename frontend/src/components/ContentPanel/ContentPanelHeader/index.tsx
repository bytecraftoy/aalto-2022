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
    setPopup: (b: boolean) => void;

    saveState: (force?: boolean) => Promise<void>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContentPanelHeader: React.FC<ContentPanelHeaderProps> = ({
    category,
    setCategory,
    setPopup,
    saveState,
    setOpen,
}) => {
    return (
        <div className="flex flex-row justify-center items-center h-16 px-4 mt-6">
            <PromptCategoryBox category={category} setCategory={setCategory} />
            <div className="h-full pl-2 z-[15]">
                <DropdownMenu
                    icon="Cog6Tooth"
                    items={[
                        {
                            action: () => setPopup(true),
                            icon: 'CubeIcon',
                            name: 'Add Boxes',
                        },
                        {
                            action: () => setOpen(true),
                            icon: 'AdjustmentsHorizontalIcon',
                            name: 'Parameters',
                        },
                        {
                            action: () => saveState(true),
                            icon: 'DocumentCheckIcon',
                            name: 'Save',
                        },
                    ]}
                />
            </div>
        </div>
    );
};
