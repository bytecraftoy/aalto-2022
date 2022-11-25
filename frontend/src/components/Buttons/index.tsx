import React from 'react';
export { CustomButton } from './ContainedButton';
export { SegmentedButtons } from './SegmentedButton';

/**
 * Basic props common to specific implementations of button
 */
export interface ButtonProps {
    name: string;
    icon?: React.ReactNode;
    color?: 'primary' | 'error';
    disabled?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
