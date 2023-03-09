import React from 'react';
import { Slider, SliderProps } from '../../Slider';
import classNames from 'classnames';

interface ParameterSliderProps extends SliderProps {
    title: string;
}

/**
 * Component with a slider and a title displaying the current value of that slider
 */
export const ParameterSlider: React.FC<ParameterSliderProps> = ({
    title,
    value,
    setValue,
    minValue,
    maxValue,
    step,
    colorPalette,
    className,
}) => {
    return (
        <div
            className={classNames(
                'w-full flex flex-col justify-start items-start py-6',
                className
            )}
        >
            <div className="px-[10%] py-6 text-xl text-neutral-30 font-thin">
                {title}
                {`: ${value}`}
            </div>
            <Slider
                value={value}
                setValue={setValue}
                minValue={minValue}
                maxValue={maxValue}
                step={step}
                colorPalette={colorPalette}
            />
        </div>
    );
};
