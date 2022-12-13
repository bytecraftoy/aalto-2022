import React, { useState } from 'react';
import classNames from 'classnames/dedupe';

/**
 * Props for textfield
 * placeholder = "what is seen before text in textarea"
 * value = text we write
 * type = changes style
 * label = helper label that user sees when starting to type in the text area
 * onInput = function to change the value
 */
interface TextInputProps {
    placeholder: string;
    value: string;
    label: string;
    onInput: React.FormEventHandler<HTMLTextAreaElement> | undefined;
}

export const TextArea: React.FC<TextInputProps> = ({
    placeholder,
    label,
    value,
    onInput,
}) => {
    const [touched, setTouched] = useState(false);

    return (
        <label className="relative w-full h-full">
            <textarea
                spellCheck={'false'}
                placeholder={placeholder}
                className={classNames(
                    'form-control peer h-40 block w-full pl-4 pr-3 py-1.5 pt-3 text-base font-normal bg-clip-padding resize-none',
                    'border-b border-onSurface focus:border-b-2 focus:border-primary focus:outline-none ',
                    'rounded-t-lg transition-colors',
                    'bg-neutral-90',
                    'placeholder:text-transparent placeholder:select-none cursor-text'
                )}
                value={value}
                onInput={onInput}
                onChange={() => setTouched(true)}
            />

            <span
                className={classNames(
                    'absolute select-none left-0 top-0 pl-4 peer-placeholder-shown:top-3.5',
                    'text-primary text-xs peer-placeholder-shown:text-neutral-10 peer-placeholder-shown:text-base',
                    'transition-all w-full',
                    'bg-neutral-90 rounded-t-lg peer-placeholder-shown:bg-opacity-0'
                )}
            >
                {value ? label : placeholder}
            </span>
        </label>
    );
};
