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
<<<<<<< HEAD
    setPopup: (b: boolean) => void;
    popupOpen: boolean;
=======
    saveState: () => void;
>>>>>>> main
}

export const ContentPanelHeader: React.FC<ContentPanelHeaderProps> = ({
    category,
    setCategory,
<<<<<<< HEAD
    setPopup,
    popupOpen,
=======
    saveState,
>>>>>>> main
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
<<<<<<< HEAD
                <div className="flex-1 z-10 pl-8">
                    <DropdownMenu
                    setPopup={setPopup}
                    popupOpen={popupOpen} 
=======
                <div className="flex-1 z-[15] pl-8">
                    <DropdownMenu
                        saveState={saveState}
>>>>>>> main
                    />
                </div>
            </div>
        </div>
    );
};
