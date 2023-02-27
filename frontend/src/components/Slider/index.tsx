import React from 'react';
import classNames from 'classnames';
import { Palette } from '../../utils/colors';

export interface SliderProps {
    value: number;
    setValue: (n: number) => void;
    minValue: number;
    maxValue: number;
    step: number;
    colorPalette: Palette;
    className?: string;
}

export const Slider: React.FC<SliderProps> = ({
    value,
    setValue,
    minValue,
    maxValue,
    step,
    className,
}) => {
    return (
        <input
            type="range"
            min={minValue}
            max={maxValue}
            step={step}
            value={value}
            onChange={(t) => setValue(Number(t.target.value))}
            className={classNames('mx-auto w-[80%]', className)}
            style={{ accentColor: '#5754A8' }}
        />
    );
};
