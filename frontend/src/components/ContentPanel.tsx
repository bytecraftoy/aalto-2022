export const ContentPanel = (props: { children: JSX.Element }) => {
    const { children } = props;
    return (
        <div className="w-full px-4 py-12">
            <div className="mx-auto my-auto w-full max-w-6xl rounded-2xl bg-panel p-12 min-h-fit">
                {children}
            </div>
        </div>
    );
};
