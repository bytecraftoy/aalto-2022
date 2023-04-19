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
}

export const TextArea: React.FC<TextInputProps> = ({
    placeholder,
    label,
    value,
    onInput,
    errors,
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
    }, [textareaRef.current?.clientWidth]);

    return (
        <div className="w-full h-full relative group">
            <textarea
                spellCheck={'false'}
                placeholder={placeholder}
                ref={textareaRef}
                className={classNames(
                    'form-control peer w-full h-56 min-h-[160px] pl-4 pr-3 pb-1.5 pt-6 text-base font-normal resize-none',
                    'border-b border-onSurface focus:border-b-2 focus:border-primary focus:outline-none ',
                    'rounded-t-lg transition-colors ',
                    'bg-neutral-90  group-hover:bg-neutral-80 focus:bg-neutral-80',
                    'placeholder:text-transparent placeholder:select-none cursor-text',
                    { 'focus:border-red border-red': showError }
                )}
                value={value}
                onInput={onInput}
                onChange={touchInput}
            />

            <span
                className={classNames(
                    'absolute select-none pointer-events-none left-0 top-0 py-1.5 pl-4 peer-placeholder-shown:top-[1.05rem] rounded-t-lg',
                    'text-primary text-xs peer-placeholder-shown:text-base',
                    'transition-all',
                    `${
                        showPlaceholder || showError
                            ? 'bg-transparent'
                            : 'group-hover:bg-neutral-80 peer-focus-within:bg-neutral-80 bg-neutral-90'
                    }`,
                    { 'text-red peer-placeholder-shown:text-red': showError },
                    { 'peer-placeholder-shown:text-neutral-10': !showError }
                )}
                style={{ width: `calc(100% - ${cachedScrollWidth}px)` }}
            >
                {showError && errors}
                {showPlaceholder && placeholder}
                {showLabel && label}
            </span>
        </div>
    );
};
