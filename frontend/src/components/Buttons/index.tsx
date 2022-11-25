import React from 'react';
import { Icon } from '../../utils/icons';
import { Color } from '../../utils/colors';
export { FilledButton } from './FilledButton';
export { SegmentedButtons } from './SegmentedButtons';

/**
 * Basic props common to specific implementations of button
 */
export interface ButtonProps {
    name: string;
    color: Color;
    icon?: Icon;
    disabled?: boolean;
    className?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}
