import React from 'react';
import classNames from 'classnames/dedupe';

interface ButtonProp {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    name: string;
    color: 'error' | 'primary';
}

export const Button: React.FC<ButtonProp> = ({ onClick, name, color }) => {
    return (
        <button
            className={classNames(
                'disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold font-sans text-sm p-3 rounded-md',
                {
                    'bg-primary-light text-primary-contrastText hover:bg-primary-main active:bg-primary-dark':
                        color === 'primary',
                },
                {
                    ' bg-error-light hover:bg-error-main active:bg-error-dark text-primary-contrastText':
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
