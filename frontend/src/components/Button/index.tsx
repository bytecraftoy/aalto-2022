import React from 'react';
import { variantStyles, defaultStyles, sizesStyles } from './theme';

interface ButtonProp {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    name: string;
    color: 'error' | 'primary';
}

export const Button: React.FC<ButtonProp> = ({ onClick, name, color }) => {
    const className =
        defaultStyles +
        ' ' +
        variantStyles[color] +
        ' ' +
        sizesStyles['default'];

    return (
        <button
            //className="font-sans font-bold text-sm bg-primary-light text-primary-contrastText p-3 rounded-xl transition-all cursor-pointer border-none hover:bg-primary-main active:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
            className={className}
            onClick={onClick}
        >
            {name}
        </button>
    );
};
