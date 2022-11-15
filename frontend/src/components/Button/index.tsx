import React from 'react';
import classNames from 'classnames/dedupe';

interface ButtonProp {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    name: string;
    color: 'error' | 'primary';
}

export const CustomButton: React.FC<ButtonProp> = ({ onClick, name, color }) => {
    return (
        <button
            className={classNames(
                'disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold font-sans text-sm p-3 rounded-md',
                {
                    'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700':
                        color === 'primary',
                },
                {
                    ' bg-red-500 hover:bg-red-600 active:bg-red-700 text-white':
                        color === 'error',
                }
            )}
            onClick={onClick}
            data-testid="custom-button"
        >
            {name}
        </button>
    );
};
