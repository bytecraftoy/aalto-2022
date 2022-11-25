import React from 'react';
import { PromptCategoryBox } from '../../PromptCategoryBox';

/**
 * Top most part of the whole content panel.
 * Contains currently only place set set category box
 *
 */

interface ContentPanelHeaderProps {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const ContentPanelHeader: React.FC<ContentPanelHeaderProps> = ({
    category,
    setCategory,
}) => {
    return (
        <div className="flex flex-row justify-around items-center">
            <PromptCategoryBox category={category} setCategory={setCategory} />
        </div>
    );
};
