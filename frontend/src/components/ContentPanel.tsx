import { FC } from "react";

interface ContentPanelProps {
  children: JSX.Element;
}

export const ContentPanel: FC<ContentPanelProps> = ({ children }) => {
  return (
    <div className="mx-auto my-auto w-full max-w-6xl rounded-xl bg-slate-700 p-10 min-h-fit">
      {children}
    </div>
  );
};
