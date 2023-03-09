import React from 'react';
import { Icon } from '../../utils/icons';
import { Palette } from '../../utils/colors';
export { FilledButton } from './FilledButton';
export { SegmentedButtons } from './SegmentedButtons';
export { TextButton } from './TextButton';
export { FAB } from './FAB';
export { IconButton } from './IconButton';

/**
 * Basic props common to specific implementations of button
 */
export interface ButtonProps {
    name: string;
    colorPalette: Palette;
    icon?: Icon;
    type?: 'submit';
    disabled?: boolean;
    className?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}
