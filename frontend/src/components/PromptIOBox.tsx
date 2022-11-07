import { StateHook } from '../utils/types';

export const PromptIOBox = (props: {
    input: string;
    setInput: StateHook<string>;
    output: string;
    setOutput: StateHook<string>;
}) => {
    const { input, setInput, output, setOutput } = props;

    const lineHeight = (text: string) => {
        return `${Math.min(
            20,
            Math.max(4, text.split('\n').length) * 1.75 + 2
        )}rem`;
    };

    return (
        <div className="pt-4 w-full flex flex-row items-center justify-around">
            <div className="w-full flex flex-col items-center justify-around">
                <h3 className="text-textcolor font-medium text-2xl pb-6">
                    Prompt
                </h3>
                <textarea
                    spellCheck={'false'}
                    className="w-full max-w-6xl rounded-t-xl bg-textfield h-36 text-textcolor font-medium text-xl px-4 py-4 outline-none outline-offset-0 focus:outline-textcolor transition-[outline-color] resize-none focus:z-10 scrollbar"
                    placeholder="User input here"
                    style={{ minHeight: lineHeight(input) }}
                    value={input}
                    onInput={({ target }) =>
                        setInput((target as HTMLTextAreaElement).value)
                    }
                />
                <textarea
                    spellCheck={'false'}
                    className="w-full max-w-6xl rounded-b-xl bg-slate-500 h-36 text-textcolor font-medium text-xl px-4 py-4 outline-none outline-offset-0 focus:outline-textcolor transition-[outline-color] resize-none focus:z-10 scrollbar"
                    placeholder="AI generated content"
                    style={{ minHeight: lineHeight(output) }}
                    value={output}
                    onInput={({ target }) =>
                        setOutput((target as HTMLTextAreaElement).value)
                    }
                />
            </div>
        </div>
    );
};
