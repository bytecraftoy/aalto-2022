import React from 'react';
import { variantStyles } from './theme';

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
    type: 'input' | 'output';
    onInput: React.FormEventHandler<HTMLTextAreaElement> | undefined;
}

export const TextInput: React.FC<TextInputProps> = ({
    placeholder,
    value,
    type,
    onInput,
}) => {
    //Calc approximately how tall a text prompt is drawn
    const lineHeight = (text: string) => {
        return `${Math.min(
            20,
            Math.max(4, text.split('\n').length) * 1.75 + 2
        )}rem`;
    };

    // Choose the style
    const className = variantStyles[type];

    return (
        <textarea
            spellCheck={'false'}
            placeholder={placeholder}
            className={className}
            style={{ minHeight: lineHeight(value) }}
            value={value}
            onInput={onInput}
        />
    );
};
