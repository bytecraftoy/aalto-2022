export const PromptIOBox = (props: {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    output: string;
    setOutput: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const { input, setInput, output, setOutput } = props;
    return (
        <div className="pt-4 w-full flex flex-row items-center justify-around">
            <div className="w-full flex flex-col items-center justify-around">
                <h3 className="text-white font-medium text-xl pb-6">
                    {' '}
                    Prompts{' '}
                </h3>
                <textarea
                    id="message"
                    rows={4}
                    //className="block p-2.5 w-full h-1/2 text-sm text-black rounded-t-lg border-2 border-b-0 border-cyan-400 resize-none"
                    className="w-full max-w-6xl rounded-t-xl bg-slate-500 h-20 text-white font-medium text-xl px-4 text-center"
                    placeholder="Input box"
                    value={input}
                    onInput={(e) =>
                        setInput((e.target as HTMLTextAreaElement).value)
                    }
                />
                <textarea
                    id="message"
                    rows={4}
                    className="w-full max-w-6xl rounded-b-xl bg-slate-500 h-20 text-white font-medium text-xl px-4 text-center"
                    placeholder="Output box"
                    value={output}
                    onInput={(e) =>
                        setOutput((e.target as HTMLTextAreaElement).value)
                    }
                />
            </div>
        </div>
    );
};
