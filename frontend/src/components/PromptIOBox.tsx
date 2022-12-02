import React from 'react';
import { FilledButton } from './Buttons';
import { TextArea } from './TextArea';
import { z } from 'zod';

/**
 * Minimum required data for representing PromptIOBox state.
 * Should also include the attributes we care about for import/export
 */
export interface PromptData {
    id: string;
    input: string;
    output: string;
    locked: boolean;
}

/**
 * Visible PromptIOBox state, and callback functions for
 * performing necessary actions of the box.
 */
interface PromptIOBoxProps {
    id: string;
    input: string;
    output: string;
    setInput: (s: string) => void;
    setOutput: (s: string) => void;
    generate: () => void;
    deleteSelf: (() => void) | null; //null --> don't show button
    lock: (id: string) => void;
}

/* Validation of user input with zod.
 *  More info about string error formatting on here:
 *  https://www.npmjs.com/package/zod#strings
 */
export const InputSchema = z
    .string({
        required_error: 'Input is required',
        invalid_type_error: 'Input must be a string',
    })
    .trim()
    .min(1, { message: 'Input must not be empty' });

/**
 * Component containing editable textareas for Input/Output with AI
 * generation.
 */
export const PromptIOBox: React.FC<PromptIOBoxProps> = ({
    id,
    input,
    output,
    setInput,
    setOutput,
    generate,
    deleteSelf,
    lock,
}) => {
    // All the errors of the input
    let errors = '';
    // Set all the validation errors
    const validatedInput = InputSchema.safeParse(input);
    if (!validatedInput.success) {
        const formattedErrors = validatedInput.error.format();
        errors = formattedErrors._errors.join(', ');
    }

    return (
        <div className="mt-10 pt-4 px-8 w-1/2 min-w-fit flex flex-col items-center justify-around">
            <div
                className="w-full flex flex-col items-center justify-between"
                data-testid="prompt"
            >
                <TextArea
                    placeholder="User input here"
                    label="Input"
                    value={input}
                    onInput={({ target }) => {
                        setInput((target as HTMLTextAreaElement).value);
                    }}
                    errors={errors}
                />
                <TextArea
                    placeholder="AI generated content"
                    label="Output"
                    value={output}
                    onInput={({ target }) => {
                        setOutput((target as HTMLTextAreaElement).value);
                    }}
                />

                <div className="flex flex-row">
                    <FilledButton
                        onClick={generate}
                        name="Generate"
                        colorPalette="primary"
                        disabled={errors ? true : false}
                    />
                    {deleteSelf ? (
                        <FilledButton
                            onClick={() => deleteSelf?.()}
                            name="Delete"
                            colorPalette="red"
                        />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};
