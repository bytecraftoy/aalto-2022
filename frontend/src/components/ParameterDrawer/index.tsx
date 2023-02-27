import React, { useEffect, useRef } from 'react';
import { Surface } from '../Surface';
import { Transition } from '@headlessui/react';
import { Divider } from '../Divider';
import { ParameterSlider } from './ParameterSlider';
import { ParameterToggle } from './ParameterToggle';
import { Preset, Parameters } from '../../utils/types';
import { Dropdown } from '../Dropdown';

interface ParameterDrawerProps {
    open: boolean;
    setOpen: (b: boolean) => void;
    preset: Preset; // Custom parameters can be a preset named "Custom"

    overrideTheme: boolean;
    setOverrideTheme: (b: boolean) => void;

    advancedMode: boolean;
    setAdvancedMode: (b: boolean) => void;

    presets: string[];
    selectPreset: (s: string) => void;
    setCustomParameters: (p: Parameters) => void;
}

export const ParameterDrawer: React.FC<ParameterDrawerProps> = ({
    open,
    setOpen,
    preset,
    overrideTheme,
    setOverrideTheme,
    advancedMode,
    setAdvancedMode,
    presets,
    selectPreset,
    setCustomParameters,
}) => {
    const drawerRef = useRef<HTMLDivElement>(null);

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
        const params = { ...preset };
        params.creativity = n;
        setCustomParameters(params);
    };

    const setInputLength = (n: number) => {
        const params = { ...preset };
        params.inputLength = n;
        setCustomParameters(params);
    };

    const setQuality = (n: number) => {
        const params = { ...preset };
        params.quality = n;

        // Cap input length if quality is set to 1-3
        if (n < 4 && params.inputLength > 4000) {
            params.inputLength = 4000;
        }

        setCustomParameters(params);
    };

    const setOutputLength = (n: number) => {
        const params = { ...preset };
        params.outputLength = n;
        setCustomParameters(params);
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
                        enabled={overrideTheme}
                        setEnabled={setOverrideTheme}
                    />

                    <Divider />
                    <div className={overrideTheme ? '' : 'hidden'}>
                        {/* Presets dropdown */}
                        <Dropdown
                            choice={preset.presetName ?? 'Select a preset'}
                            choices={presets}
                            setChoice={selectPreset}
                            className="px-4 mb-4"
                        />

                        <div className={overrideTheme ? '' : 'hidden'}>
                            <ParameterToggle
                                title="Advanced settings"
                                enabled={advancedMode}
                                setEnabled={setAdvancedMode}
                            />
                            <Divider />
                        </div>

                        <div
                            className={
                                overrideTheme && advancedMode ? '' : 'hidden'
                            }
                        >
                            <ParameterSlider
                                title="Creativity"
                                minValue={0}
                                maxValue={1}
                                step={0.001}
                                value={preset.creativity}
                                setValue={setCreativity}
                                colorPalette="primary"
                            />

                            <ParameterSlider
                                title="Quality"
                                minValue={1}
                                maxValue={9}
                                step={1}
                                value={preset.quality}
                                setValue={setQuality}
                                colorPalette="primary"
                            />

                            <ParameterSlider
                                title="Input length"
                                minValue={1024}
                                maxValue={preset.quality < 4 ? 4000 : 8000}
                                step={1}
                                value={preset.inputLength}
                                setValue={setInputLength}
                                colorPalette="primary"
                            />

                            <ParameterSlider
                                title="Output length"
                                minValue={1}
                                maxValue={5}
                                step={1}
                                value={preset.outputLength}
                                setValue={setOutputLength}
                                colorPalette="primary"
                            />
                        </div>
                    </div>
                </div>
            </Surface>
        </Transition>
    );
};
