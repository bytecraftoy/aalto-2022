import classNames from 'classnames';
import React, { useState } from 'react';

/**
 * Reusable input component with predefined style.
 *
 */

interface InputProps {
    type: React.HTMLInputTypeAttribute;
    value: string | number | readonly string[] | undefined;
    onInput: React.FormEventHandler<HTMLInputElement>;
    label?: string;
    textHelper?: string;
    required?: true;
}

// Input template with predefined styles
export const CustomInput: React.FC<InputProps> = ({
    type,
    value,
    onInput,
    label,
    textHelper,
    required,
}) => {
    const [touched, setTouched] = useState(false);
    let error = '';

    //Simple validation
    if (touched && required && value === '') {
        error = '*Required';
    }

    return (
        <div className="relative">
            <input
                id={`${label}`}
                name={`${label}`}
                type={type}
                spellCheck={'false'}
                value={value}
                //className=" font-sans text-base font-normal leading-normal p-3 rounded-xl text-gray-900 bg-white border-gray-300 border shadow hover:border-primary focus:outline-none focus:ring focus:border-primary"
                className={classNames(
                    // Shape
                    'min-w-[280px] h-12 pl-4 pr-3 rounded-t peer',
                    // Text styles
                    'font-sans text-base font-normal transition-colors',
                    //Color styles
                    'bg-neutral-90 hover:bg-onSurface hover:bg-opacity-10 ',
                    // Borders
                    ' border-b border-onSurface focus:outline-none focus:border-b-2 focus:border-primary ',
                    //other
                    'placeholder:text-transparent cursor-text'
                )}
                placeholder="category"
                onInput={onInput}
                onChange={() => setTouched(true)}
                required
            />
            <label
                htmlFor={`${label}`}
                className={classNames(
                    // Positions
                    'absolute left-0 top-0 peer-placeholder-shown:top-2.5',
                    // Text
                    'text-primary text-xs peer-placeholder-shown:text-neutral-10 peer-placeholder-shown:text-base ',
                    // other
                    'pl-4 transition-all cursor-text'
                )}
            >
                {label}
            </label>
            {!error ? (
                <div className=" pt-1 px-4 text-xs max-w-[280px] text-neutral-30 ">
                    {textHelper}
                </div>
            ) : (
                <div className=" pt-1 px-4 text-xs max-w-[280px] text-red-40">
                    {error}
                </div>
            )}
        </div>
    );
};
