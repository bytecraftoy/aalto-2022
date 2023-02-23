import React from 'react';
import { CustomInput } from '../../../Inputs';

interface ThemeInputProps {
    name: string;
    setName: (s: string) => void;
    saveState: () => void;
}

/** Component exposing a textfield for editing a panel category */
export const ThemeInput: React.FC<ThemeInputProps> = ({
    name,
    setName,
    saveState,
}) => {
    return (
        <div className="w-full flex flex-col min-h-fit justify-start items-center">
            <CustomInput
                type={'text'}
                value={name}
                label={'Theme'}
                textHelper={'Type the theme of your project'}
                onInput={({ target }) =>
                    setName((target as HTMLInputElement).value)
                }
                onFocusOut={saveState}
            />
        </div>
    );
};
