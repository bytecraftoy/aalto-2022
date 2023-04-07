import React, { useMemo } from 'react';
import classNames from 'classnames/dedupe';
import { InputProps } from '../index';
import { useError } from '../hooks';

/**
 * Props for textfield
 * placeholder = "what is seen before text in textarea"
 * value = text we write
 * type = changes style
 * label = helper label that user sees when starting to type in the text area
 * onInput = function to change the value
 */
interface TextInputProps extends InputProps {
    placeholder: string;
    value: string;
    onInput: React.FormEventHandler<HTMLTextAreaElement>;
    resizable: boolean;
}

export const TextArea: React.FC<TextInputProps> = ({
    placeholder,
    label,
    value,
    onInput,
    errors,
    resizable = false,
}) => {
    // Ref to the textarea element
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    // Show error if there are errors
    const { showError, touchInput } = useError(errors);
    // Show placeholder when there are no user input and not showing error
    const showPlaceholder: boolean = !showError && !value;
    // Else show the label
    const showLabel: boolean = !showError && value.length > 0;

    // Calculate the width of the scrollbar
    const cachedScrollWidth = useMemo(() => {
        if (textareaRef.current) {
            return (
                textareaRef.current?.offsetWidth -
                textareaRef.current?.clientWidth
            );
        } else {
            return 0;
        }
    }, [textareaRef.current]);

    return (
        <label className="relative w-full h-full group">
            <textarea
                spellCheck={'false'}
                placeholder={placeholder}
                ref={textareaRef}
                className={classNames(
                    'form-control peer h-40 min-h-[160px] block w-full pl-4 pr-3 py-1.5 pt-3 text-base font-normal bg-clip-padding resize-none',
                    'border-b border-onSurface focus:border-b-2 focus:border-primary focus:outline-none ',
                    'rounded-t-lg transition-colors ',
                    'bg-neutral-90  group-hover:bg-neutral-80 focus:bg-neutral-80',
                    'placeholder:text-transparent placeholder:select-none cursor-text',
                    { 'focus:border-red border-red': showError },
                    { 'resize-y': resizable }
                )}
                value={value}
                onInput={onInput}
                onChange={touchInput}
            />

            <span
                className={classNames(
                    'absolute select-none cursor-text left-0 top-0 pl-4 peer-placeholder-shown:top-3.5 rounded-t-lg',
                    'text-primary text-xs peer-placeholder-shown:text-neutral-40 peer-placeholder-shown:text-base',
                    'transition-all',
                    `${
                        showPlaceholder
                            ? 'bg-transparent'
                            : 'group-hover:bg-neutral-80 peer-focus-within:bg-neutral-80 bg-neutral-90'
                    }`,
                    {
                        'text-red peer-placeholder-shown:text-red': showError,
                    }
                )}
                style={{ width: `calc(100% - ${cachedScrollWidth}px)` }}
            >
                {showError && errors}
                {showPlaceholder && placeholder}
                {showLabel && label}
            </span>
        </label>
    );
};
