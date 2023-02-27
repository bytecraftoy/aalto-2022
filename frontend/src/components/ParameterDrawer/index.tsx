import React, { useEffect, useRef, useState } from 'react';
import { Surface } from '../Surface';
import { Transition } from '@headlessui/react';
import { Divider } from '../Divider';
import { ParameterSlider } from './ParameterSlider';
import { ParameterToggle } from './ParameterToggle';
import { Parameters } from '../../utils/types';
import { Dropdown } from '../Dropdown';

interface ParameterDrawerProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    preset: string;
    setPreset: (s: string) => void;
    presets: string[];
    parameters: Parameters;
    setParameters: (p: Parameters | undefined) => void;
    // Allow setting params to undefined for reset
}

export const ParameterDrawer: React.FC<ParameterDrawerProps> = ({
    preset,
    setPreset,
    presets,
    parameters,
    setParameters,
    open,
    setOpen,
}) => {
    const drawerRef = useRef<HTMLDivElement>(null);

    // Use custom parameters vs global parameters
    const [useCustom, setUseCustom] = useState(false);

    // Use advanced mode (sliders) vs presets
    const [useAdvanced, setUseAdvanced] = useState(false);

    // Shows Custom preset if sliders are changed
    const [isChanged, setIsChanged] = useState(false);

    const setPanelPreset = (s: string) => {
        setIsChanged(false);
        setPreset(s);
    };

    const toggleCustom = (b: boolean) => {
        setUseCustom(b);

        if (!b) {
            // Reset parameters to undefined => default values
            setParameters(undefined);

            // Reset advanced mode
            setUseAdvanced(false);
        }
    };

    useEffect(() => {
        // Closes the drawer if clicked outside of the drawer
        const close = (e: MouseEvent) => {
            if (!drawerRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        // Add new event listener
        document.addEventListener('mousedown', close);

        return () => {
            document.removeEventListener('mousedown', close);
        };
    }, []);

    const setCreativity = (n: number) => {
        const params = { ...parameters };
        params.creativity = n;
        setParameters(params);
        setIsChanged(true);
    };

    const setInputLength = (n: number) => {
        const params = { ...parameters };
        params.inputLength = n;
        setParameters(params);
        setIsChanged(true);
    };

    const setQuality = (n: number) => {
        const params = { ...parameters };
        params.quality = n;
        setParameters(params);
        setIsChanged(true);
    };

    const setOutputLength = (n: number) => {
        const params = { ...parameters };
        params.outputLength = n;
        setParameters(params);
        setIsChanged(true);
    };

    return (
        <Transition
            ref={drawerRef}
            className="z-30 fixed top-1 right-0 h-full"
            show={open}
            unmount={false}
            enter="transition-all duration-200"
            enterFrom="opacity-0 translate-x-20"
            enterTo="opacity-100 -translate-x-0"
            leave="transition-all duration-200"
            leaveFrom="opacity-100 -translate-x-0"
            leaveTo="opacity-0 translate-x-20"
        >
            <Surface level={1} className="w-[360px] h-full px-3 py-3">
                {/* The data area */}
                <div className="h-full w-full p-3 overflow-y-auto scrollbar-hide">
                    {/* Drawer header */}
                    <div className="py-2 pl-4 pr-2 h-14">
                        <h2 className="text-xl">Properties</h2>
                    </div>

                    <ParameterToggle
                        title="Override theme settings"
                        enabled={useCustom}
                        setEnabled={toggleCustom}
                    />

                    <Divider />
                    <div className={useCustom ? '' : 'hidden'}>
                        {/* Presets dropdown */}
                        <Dropdown
                            choice={isChanged ? 'Custom' : preset}
                            choices={presets}
                            setChoice={setPanelPreset}
                            disabled={!useCustom}
                            className="px-4 mb-4"
                        />

                        <div className={useCustom ? '' : 'hidden'}>
                            <ParameterToggle
                                title="Advanced settings"
                                enabled={useAdvanced}
                                setEnabled={setUseAdvanced}
                            />
                            <Divider />
                        </div>

                        <div
                            className={useCustom && useAdvanced ? '' : 'hidden'}
                        >
                            <ParameterSlider
                                title="Creativity"
                                minValue={0}
                                maxValue={1}
                                step={0.001}
                                value={parameters.creativity}
                                setValue={setCreativity}
                                colorPalette="primary"
                            />

                            <ParameterSlider
                                title="Input length"
                                minValue={1024}
                                maxValue={8000}
                                step={1}
                                value={parameters.inputLength}
                                setValue={setInputLength}
                                colorPalette="primary"
                            />

                            <ParameterSlider
                                title="Output length"
                                minValue={1}
                                maxValue={5}
                                step={1}
                                value={parameters.outputLength}
                                setValue={setOutputLength}
                                colorPalette="primary"
                            />

                            <ParameterSlider
                                title="Quality"
                                minValue={1}
                                maxValue={9}
                                step={1}
                                value={parameters.quality}
                                setValue={setQuality}
                                colorPalette="primary"
                            />
                        </div>
                    </div>
                </div>
            </Surface>
        </Transition>
    );
};
