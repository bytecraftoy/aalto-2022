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
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    addPromptBoxes: (n: number) => void;
    saveState: () => void;
}

export const ContentPanelHeader: React.FC<ContentPanelHeaderProps> = ({
    category,
    setCategory,
    addPromptBoxes,
    saveState,
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
                <div className="flex-1 z-30 pl-8">
                    <DropdownMenu
                        addPromptBoxes={addPromptBoxes}
                        saveState={saveState}
                    />
                </div>
            </div>
        </div>
    );
};
