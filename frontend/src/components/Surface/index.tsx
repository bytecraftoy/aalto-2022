import React from 'react';
import classNames from 'classnames';

/**
 * Material design surface
 * In the material design, corresponds to colors surface 1 - 5.
 */

interface SurfaceProps {
    children: React.ReactNode;
    level: 1 | 2 | 3 | 4 | 5;
    className?: string;
}

export const Surface: React.FC<SurfaceProps> = ({
    children,
    level,
    className,
}) => {
    return (
        <div
            className={classNames(
                { 'bg-surface-1': level === 1 },
                { 'bg-surface-2': level === 2 },
                { 'bg-surface-3': level === 3 },
                { 'bg-surface-4': level === 4 },
                { 'bg-surface-5': level === 5 },
                className
            )}
        >
            {children}
        </div>
    );
};
