import React from 'react';

/**
 * Component for creating SVG icons
 */

interface IconProps {
    icon: string;
    width?: number;
    height?: number;
    color?: string;
}

export const Icon: React.FC<IconProps> = ({ icon, width, height, color }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width ? width : 24}
            height={height ? height : 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color ? color : 'currentColor'}
            className="m-auto"
        >
            <path d={icon} />
        </svg>
    );
};
