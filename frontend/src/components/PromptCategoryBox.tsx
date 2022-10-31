export const PromptCategoryBox = () => {
  return (
    <div className="w-full flex flex-col min-h-fit justify-start items-center">
      <h2 className="text-white font-medium text-2xl pb-6"> Category </h2>
      <input
        type={"text"}
        className="w-full max-w-2xl rounded-xl bg-slate-500 h-10 text-white font-medium text-xl px-4 text-center"
      />
    </div>
  );
};
