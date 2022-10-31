export const PromptIOBox = () => {
  return (
    <div className="PrompIOBox w-full h-full">
      <textarea
        id="message"
        rows={4}
        className="block p-2.5 w-full h-1/2 text-sm text-black rounded-t-lg border-2 border-b-0 border-cyan-400 resize-none"
        placeholder="Input box"
      ></textarea>
      <textarea
        id="message"
        rows={4}
        className="block p-2.5 w-full h-1/2 text-sm text-black rounded-b-lg border-2 border-cyan-400 resize-none"
        placeholder="Output box"
      ></textarea>
    </div>
  );
}