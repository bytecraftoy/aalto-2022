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
    errors?: string;
}

export const TextArea: React.FC<TextInputProps> = ({
    placeholder,
    label,
    value,
    onInput,
    errors,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [touched, setTouched] = useState(false);

    // Show error when input contains error and user has touched the input
    const showError: boolean =
        touched && errors != undefined && errors.length > 0;
    // Show placeholder when there are no user input and not showing error
    const showPlaceholder: boolean = !showError && !value;
    // Else show the label
    const showLabel: boolean = !showError && value.length > 0;

    return (
        <label className="relative w-full h-full">
            <textarea
                spellCheck={'false'}
                placeholder={placeholder}
                className={classNames(
                    'form-control peer h-40 block w-full pl-4 pr-3 py-1.5 pt-3 text-base font-normal bg-clip-padding  resize-none',
                    'border-b border-onSurface focus:border-b-2 focus:border-primary focus:outline-none ',
                    'rounded-t-lg transition-colors ',
                    'bg-neutral-90 hover:bg-onSurface hover:bg-opacity-10',
                    'placeholder:text-transparent placeholder:select-none cursor-text',
                    { 'focus:border-red border-red': touched && errors }
                )}
                value={value}
                onInput={onInput}
                onChange={() => setTouched(true)}
            />

            <span
                className={classNames(
                    'absolute select-none left-0 top-0 pl-4 peer-placeholder-shown:top-3.5',
                    'text-primary text-xs peer-placeholder-shown:text-neutral-10 peer-placeholder-shown:text-base',
                    'transition-all',
                    {
                        'text-red peer-placeholder-shown:text-red':
                            touched && errors,
                    }
                )}
            >
                {showError && errors}
                {showPlaceholder && placeholder}
                {showLabel && label}
            </span>
        </label>
    );
};
