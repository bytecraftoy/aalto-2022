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
    textHelper?: string;
}

// Input template with predefined styles
export const CustomInput: React.FC<CustomInputProps> = ({
    type,
    value,
    onInput,
    label,
    textHelper,
    errors,
}) => {
    const { showError, touchInput } = useError(errors);

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
                onChange={touchInput}
            />
            <span
                className={classNames(
                    // Positions
                    'absolute select-none pointer-events-none left-0 top-0 peer-placeholder-shown:top-4',
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
