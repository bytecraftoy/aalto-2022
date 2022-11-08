import React from 'react';

interface ButtonProp {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    name: string;
}

export const Button: React.FC<ButtonProp> = ({ onClick, name }) => {
 
    return (
        <button
            className="rounded-lg bg-textfield text-textcolor h-16 min-h-fit font-medium text-xl px-4 text-center mx-6 mt-8 hover:bg-slate-500 transition-colors outline-none outline-offset-0 focus:outline-textcolor"
            onClick={onClick}
        >
            {name}
        </button>
    )
}

