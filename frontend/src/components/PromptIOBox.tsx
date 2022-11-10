import { FC } from 'react';

/**
 * Minimum required data for representing PromptIOBox state.
 * Should also include the attributes we care about for import/export
 */
export interface PromptData {
    id: string;
    input: string;
    output: string;
}

/**
 * Visible PromptIOBox state, and callback functions for
 * performing necessary actions of the box.
 */
interface PromptIOBoxProps {
    input: string;
    output: string;
    setInput: (s: string) => void;
    setOutput: (s: string) => void;
    generate: () => void;
    deleteSelf: (() => void) | null; //null --> don't show button
}
/**
 * Component containing editable textareas for Input/Output with AI
 * generation.
 */
export const PromptIOBox: FC<PromptIOBoxProps> = ({
    input,
    output,
    setInput,
    setOutput,
    generate,
    deleteSelf,
}) => {
    //Calc approximately how tall a text prompt is drawn
    const lineHeight = (text: string) => {
        return `${Math.min(
            20,
            Math.max(4, text.split('\n').length) * 1.75 + 2
        )}rem`;
    };

    return (
        <div className="mt-16 pt-4 px-4 w-1/2 min-w-fit flex flex-col items-center justify-around">
            <div className="w-full flex flex-col items-center justify-between">
                <h3 className="text-onSurface font-medium text-2xl pb-6">
                    Prompt
                </h3>
                <textarea
                    spellCheck={'false'}
                    className="w-full max-w-6xl rounded-t-xl bg-textfield h-36 text-textcolor font-medium text-xl px-4 py-4 outline-none outline-offset-0 focus:outline-textcolor transition-[outline-color] resize-none focus:z-10 scrollbar"
                    placeholder="User input here"
                    style={{ minHeight: lineHeight(input) }}
                    value={input}
                    onInput={({ target }) => {
                        setInput((target as HTMLTextAreaElement).value);
                    }}
                />
                <textarea
                    spellCheck={'false'}
                    className="w-full max-w-6xl rounded-b-xl bg-slate-500 h-36 text-textcolor font-medium text-xl px-4 py-4 outline-none outline-offset-0 focus:outline-textcolor transition-[outline-color] resize-none focus:z-10 scrollbar"
                    placeholder="AI generated content"
                    style={{ minHeight: lineHeight(output) }}
                    value={output}
                    onInput={({ target }) => {
                        setOutput((target as HTMLTextAreaElement).value);
                    }}
                />
                <div className="flex flex-row">
                    <button
                        className="rounded-lg bg-textfield text-textcolor h-16 min-h-fit font-medium text-xl px-4 text-center mx-6 mt-8 hover:bg-slate-500 transition-colors outline-none outline-offset-0 focus:outline-textcolor"
                        onClick={generate}
                    >
                        Generate
                    </button>
                    {deleteSelf ? (
                        <button
                            className="rounded-lg bg-textfield text-textcolor h-16 min-h-fit font-medium text-xl px-4 text-center mx-6 mt-8 hover:bg-slate-500 transition-colors outline-none outline-offset-0 focus:outline-textcolor"
                            onClick={() => deleteSelf?.()}
                        >
                            Delete
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};
