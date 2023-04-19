import React from 'react';
import { CustomInput } from '../../../Inputs';

interface PromptCategoryBoxProps {
    category: string;
    setCategory: (s: string) => void;
}

/** Component exposing a textfield for editing a panel category */
export const PromptCategoryBox: React.FC<PromptCategoryBoxProps> = ({
    category,
    setCategory,
}) => {
    return (
        <CustomInput
            type={'text'}
            value={category}
            label={'Category'}
            textHelper={'Type the category of the prompt'}
            onInput={({ target }) =>
                setCategory((target as HTMLInputElement).value)
            }
        />
    );
};
