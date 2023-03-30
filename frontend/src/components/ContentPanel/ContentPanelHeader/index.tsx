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
        <div className="flex flex-row justify-around items-center mt-6">
            <div className="flex flex-row justify-around items-center">
                <div className="flex-1">
                    <PromptCategoryBox
                        category={category}
                        setCategory={setCategory}
                    />
                </div>
                <div className="flex-1 z-[15] pl-8">
                    <DropdownMenu
                        icon="Cog6Tooth"
                        choices={[
                            { action: () => setPopup(true), name: 'Add Boxes' },
                            { action: () => setOpen(true), name: 'Parameters' },
                            { action: () => saveState(true), name: 'Save' },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};
