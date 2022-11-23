import { FC } from 'react';
import { StateHook } from '../utils/types';
import { CustomInput } from './Input';

interface PromptCategoryBoxProps {
    category: string;
    setCategory: StateHook<string>;
}

/** Component exposing a textfield for editing a panel category */
export const PromptCategoryBox: FC<PromptCategoryBoxProps> = ({
    category,
    setCategory,
}) => {
    return (
        <div className="w-full  flex flex-col min-h-fit justify-start items-center mt-2 mb-20">
            <CustomInput
                type={'text'}
                value={category}
                label={'Category'}
                required
                textHelper={'Type the category of the prompt'}
                onInput={({ target }) =>
                    setCategory((target as HTMLInputElement).value)
                }
            />
        </div>
    );
};
