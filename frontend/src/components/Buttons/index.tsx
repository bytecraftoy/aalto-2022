import React from 'react';
import { Icon } from '../../utils/icons';
import { Palette } from '../../utils/colors';
export { FilledButton } from './FilledButton';
export { SegmentedButtons } from './SegmentedButtons';
export { TextButton } from './TextButton';
export { FAB } from './FAB';

/**
 * Basic props common to specific implementations of button
 */
export interface ButtonProps {
    name: string;
    colorPalette: Palette;
    icon?: Icon;
    disabled?: boolean;
    className?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}
