import React from 'react';

/**
 * Component for creating SVG icons
 * For using predefined icons using HeroIcons, look at utils/icons instead
 */

interface SvgIconProps {
    svg: string;
    width?: number;
    height?: number;
    color?: string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
    svg,
    width,
    height,
    color,
}) => {
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
            <path d={svg} />
        </svg>
    );
};
