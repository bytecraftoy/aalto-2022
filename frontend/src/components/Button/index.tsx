import React from 'react';

interface ButtonProp {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    name: string;
}

export const Button: React.FC<ButtonProp> = ({ onClick, name }) => {
    return (
        <button
            className="font-sans font-bold text-sm bg-primary-light text-primary-contrastText p-3 rounded-xl transition-all cursor-pointer border-none hover:bg-primary-main active:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onClick}
        >
            {name}
        </button>
    );
};
