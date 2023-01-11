import React from 'react';
import { PromptCategoryBox } from '../../PromptCategoryBox';
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
}

export const ContentPanelHeader: React.FC<ContentPanelHeaderProps> = ({
    category,
    setCategory,
    addPromptBoxes,
}) => {
    return (
        <div className="flex flex-row justify-around items-center mt-6">
            <div className="flex-1"></div>
            <div className="flex-1">
                <PromptCategoryBox
                    category={category}
                    setCategory={setCategory}
                />
            </div>
            {
                <div className="flex-1 z-10">
                    <DropdownMenu
                        addPromptBoxes={addPromptBoxes}
                        colorPalette="primary"
                    />
                </div>
            }
        </div>
    );
};
