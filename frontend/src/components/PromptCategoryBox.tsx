import { FC } from 'react';
import { StateHook } from '../utils/types';
import { Input } from './Input';

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
            <h2 className="text-onBackground font-medium text-2xl pb-6">
                Category
            </h2>
            {/* <input
                type={'text'}
                spellCheck={'false'}
                className="w-full max-w-2xl rounded-xl h-10 text-textcolor bg-textfield font-medium text-xl px-4 text-center outline-none outline-offset-0 focus:outline-textcolor transition-[outline-color]"
                value={category}
                onInput={({ target }) =>
                    setCategory((target as HTMLInputElement).value)
                }
            /> */}
            <Input 
                type={'text'}
                value={category}
                onInput={({ target }) =>
                    setCategory((target as HTMLInputElement).value)
                }
            />
        </div>
    );
};
