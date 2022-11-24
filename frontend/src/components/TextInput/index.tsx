import React from 'react';
import classNames from 'classnames/dedupe';

/**
 * Props for textfield
 * placeholder = "what is seen before text in textarea"
 * value = text we write
 * type = changes style
 * onInput = function to change the value
 */
interface TextInputProps {
    placeholder: string;
    value: string;
    onInput: React.FormEventHandler<HTMLTextAreaElement> | undefined;
}

export const CustomTextInput: React.FC<TextInputProps> = ({
    placeholder,
    value,
    onInput,
}) => {
    //Calc approximately how tall a text prompt is drawn
    const lineHeight = (text: string) => {
        return `${Math.min(
            20,
            Math.max(4, text.split('\n').length) * 1.75 + 2
        )}rem`;
    };

    return (
        <textarea
            spellCheck={'false'}
            placeholder={placeholder}
            className={classNames(
                'form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none text-gray-700 bg-surface focus:text-gray-700 focus:bg-white focus:border-primary'
            )}
            style={{ minHeight: lineHeight(value) }}
            value={value}
            onInput={onInput}
        />
    );
};
