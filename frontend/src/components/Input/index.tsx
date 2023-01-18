import classNames from 'classnames';
import React, { useState } from 'react';

/**
 * Reusable input component with predefined style.
 *
 */

interface InputProps {
    type: React.HTMLInputTypeAttribute;
    value: string | number | readonly string[];
    onInput: React.FormEventHandler<HTMLInputElement>;
    label?: string;
    textHelper?: string;
    errors?: string;
}

// Input template with predefined styles
export const CustomInput: React.FC<InputProps> = ({
    type,
    value,
    onInput,
    label,
    textHelper,
    errors,
}) => {
    const [touched, setTouched] = useState(false);

    // Show error when input contains error and user has touched the input
    const showError: boolean =
        touched && errors != undefined && errors.length > 0;

    return (
        <label className="relative">
            <input
                type={type}
                spellCheck={'false'}
                value={value}
                className={classNames(
                    // Shape
                    'min-w-[280px] h-12 pl-4 pr-3 pt-3 rounded-t-lg peer',
                    // Text styles
                    'font-sans text-base font-normal transition-colors',
                    //Color styles
                    'bg-neutral-90 hover:bg-onSurface hover:bg-opacity-10 ',
                    // Borders
                    ' border-b border-onSurface focus:outline-none focus:border-b-2 focus:border-primary ',
                    //other
                    'placeholder:text-transparent placeholder:select-none cursor-text'
                )}
                placeholder="category"
                onInput={onInput}
                onChange={() => setTouched(true)}
            />
            <span
                className={classNames(
                    // Positions
                    'absolute select-none left-0 top-0 peer-placeholder-shown:top-4',
                    // Text
                    'text-primary text-xs peer-placeholder-shown:text-neutral-10 peer-placeholder-shown:text-base ',
                    // other
                    'pl-4 transition-all cursor-text'
                )}
            >
                {label}
            </span>
            <div
                className={classNames(
                    'pl-4 text-primary text-xs transition-all',
                    {
                        'text-red': showError,
                    }
                )}
            >
                {showError ? errors : textHelper}
            </div>
        </label>
    );
};
