import classNames from 'classnames';
import React from 'react';
import { InputProps } from '..';
import { useError } from '../hooks';

/**
 * Reusable input component with predefined style.
 *
 */

interface CustomInputProps extends InputProps {
    onInput: React.FormEventHandler<HTMLInputElement>;
    onFocusOut?: React.FormEventHandler<HTMLInputElement>;
    textHelper?: string;
    inputRef?: React.LegacyRef<HTMLInputElement>;
}

// Input template with predefined styles
export const CustomInput: React.FC<CustomInputProps> = ({
    type,
    value,
    onInput,
    onFocusOut,
    label,
    textHelper,
    inputRef,
    errors,
}) => {
    const { showError, touchInput } = useError(errors);

    return (
        <label className="relative max-w-[280px] inline-block w-full">
            <input
                ref={inputRef}
                type={type}
                spellCheck={'false'}
                value={value}
                className={classNames(
                    // Shape
                    'w-full h-12 pl-4 pr-3 pt-3 rounded-t-lg peer',
                    // Text styles
                    'font-sans text-base font-normal transition-colors',
                    //Color styles
                    'bg-neutral-90 hover:bg-neutral-80 ',
                    // Borders
                    ' border-b border-onSurface focus:outline-none focus:border-b-2 focus:border-primary ',

                    // Make default placeholder transparent, because we use a custom span instead of it
                    'placeholder:text-transparent placeholder:select-none cursor-text'
                )}
                placeholder={label}
                onInput={onInput}
                onChange={touchInput}
                onBlur={onFocusOut}
            />
            <span
                className={classNames(
                    // Positions
                    'absolute select-none left-0 top-0 peer-placeholder-shown:top-[1.05rem]',
                    // Text
                    'text-primary text-xs peer-placeholder-shown:text-neutral-10 peer-placeholder-shown:text-base ',
                    // other
                    'pl-4 transition-all cursor-text pointer-events-none'
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
