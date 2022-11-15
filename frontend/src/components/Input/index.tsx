import React from 'react';

interface InputProps {
    type: React.HTMLInputTypeAttribute;
    value: string | number | readonly string[] | undefined;
    onInput: React.FormEventHandler<HTMLInputElement>;
}

// Input template with predefined styles
export const CustomInput: React.FC<InputProps> = ({ type, value, onInput }) => {
    return (
        <input
            type={type}
            spellCheck={'false'}
            value={value}
            className=" font-sans text-base font-normal leading-normal p-3 rounded-xl text-gray-900 bg-white border-gray-300 border shadow hover:border-blue-400 focus:outline-none focus:ring focus:border-blue-400"
            onInput={onInput}
        />
    );
};
