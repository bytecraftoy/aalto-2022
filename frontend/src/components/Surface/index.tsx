import React from 'react';
import classNames from 'classnames';

/**
 * Material design surface
 * In the material design, corresponds to colors surface 1 - 5.
 * Components created in order to reduce double div declarations in
 * other components that are needed ion order to create the right
 * surface color.
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
        <div className={`bg-primary-99 ` + className}>
            <div
                className={classNames(
                    'bg-primary',
                    className,
                    { ' bg-opacity-5': level === 1 },
                    { ' bg-opacity-8': level === 2 },
                    { ' bg-opacity-11': level === 3 },
                    { 'bg-opacity-12': level === 4 },
                    { 'bg-opacity-14': level === 5 }
                )}
            >
                {children}
            </div>
        </div>
    );
};
