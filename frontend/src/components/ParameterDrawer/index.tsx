import React, { useEffect, useRef } from 'react';
import { Surface } from '../Surface';
import { Transition } from '@headlessui/react';
import { Divider } from '../Divider';
import { ParameterSlider } from './ParameterSlider';
import { ParameterToggle } from './ParameterToggle';
import {
    Preset,
    Parameters,
    DEFAULT_PROMPT_STRUCTURE,
    DEFAULT_PARAMETERS,
} from '../../utils/types';
import { FilledButton, IconButton } from '../Buttons';
import { Dropdown } from '../Dropdown';
import { CustomInput } from '../Inputs';

interface ParameterDrawerProps {
    themeDrawer?: boolean;

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
    themeDrawer,
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

    const setPromptPrefix = (s: string) => {
        const params = { ...preset };
        if (!params.promptBase) params.promptBase = DEFAULT_PROMPT_STRUCTURE;
        params.promptBase = { ...params.promptBase, prefix: s };
        setCustomParameters(params);
    };

    const setPromptCategoryText = (s: string) => {
        const params = { ...preset };
        if (!params.promptBase) params.promptBase = DEFAULT_PROMPT_STRUCTURE;
        params.promptBase = { ...params.promptBase, categoryText: s };
        setCustomParameters(params);
    };

    const setPromptThemeText = (s: string) => {
        const params = { ...preset };
        if (!params.promptBase) params.promptBase = DEFAULT_PROMPT_STRUCTURE;
        params.promptBase = { ...params.promptBase, themeText: s };
        setCustomParameters(params);
    };

    const setPromptSuffix = (s: string) => {
        const params = { ...preset };
        if (!params.promptBase) params.promptBase = DEFAULT_PROMPT_STRUCTURE;
        params.promptBase = { ...params.promptBase, suffix: s };
        setCustomParameters(params);
    };

    return (
        <Transition
            ref={drawerRef}
            show={open}
            unmount={false}
            enter="transition-all duration-200"
            enterFrom="opacity-0 translate-x-20"
            enterTo="opacity-100 -translate-x-0"
            leave="transition-all duration-200"
            leaveFrom="opacity-100 -translate-x-0"
            leaveTo="opacity-0 translate-x-20"
            className="z-30 fixed top-1 right-0 max-w-[360px] w-[80%] h-full"
        >
            <Surface level={1} className="w-full h-full px-3 py-3">
                {/* The data area */}
                <div className="h-full w-full p-3 overflow-y-auto scrollbar-hide">
                    {/* Drawer header */}
                    <div className="flex flex-row items-center justify-between py-2 pl-4 pr-2 h-14">
                        <IconButton
                            icon="ArrowRightIcon"
                            colorPalette="secondary"
                            onClick={() => setOpen(false)}
                            className="inline-block"
                        />
                        <h2 className="text-xl inline-block">Properties</h2>
                    </div>

                    <ParameterToggle
                        title={
                            themeDrawer
                                ? 'Theme settings'
                                : 'Override theme settings'
                        }
                        enabled={overrideTheme}
                        setEnabled={setOverrideTheme}
                    />

                    <Divider />
                    <div className={overrideTheme ? '' : 'hidden'}>
                        {/* Presets dropdown */}
                        <Dropdown
                            choice={preset.presetName}
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
                            <div className="w-full flex flex-row justify-between items-center py-6 px-4">
                                <h3 className="font-medium text-lg">
                                    Prompt construction
                                </h3>
                            </div>

                            <div className="mb-4">
                                <Divider />
                            </div>

                            <div className="px-[10%] grid gap-6">
                                <CustomInput
                                    onInput={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setPromptPrefix(e.target.value)}
                                    label="Prompt prefix"
                                    value={
                                        preset.promptBase?.prefix ??
                                        DEFAULT_PROMPT_STRUCTURE.prefix
                                    }
                                />

                                <p className="text-xl text-center text-neutral-30 font-thin">
                                    {'{ '}input{' }'}
                                </p>

                                <CustomInput
                                    onInput={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setPromptCategoryText(e.target.value)}
                                    label="Category prefix"
                                    value={
                                        preset.promptBase?.categoryText ??
                                        DEFAULT_PROMPT_STRUCTURE.categoryText
                                    }
                                />

                                <p className="text-xl text-center text-neutral-30 font-thin">
                                    {'{ '}category{' }'}
                                </p>

                                <CustomInput
                                    onInput={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setPromptThemeText(e.target.value)}
                                    label="Theme prefix"
                                    value={
                                        preset.promptBase?.themeText ??
                                        DEFAULT_PROMPT_STRUCTURE.themeText
                                    }
                                />

                                <p className="text-xl text-center text-neutral-30 font-thin">
                                    {'{ '}theme{' }'}
                                </p>

                                <CustomInput
                                    onInput={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setPromptSuffix(e.target.value)}
                                    label="Prompt suffix"
                                    value={
                                        preset.promptBase?.suffix ??
                                        DEFAULT_PROMPT_STRUCTURE.suffix
                                    }
                                />
                            </div>

                            <div className="my-4">
                                <Divider />
                            </div>

                            <FilledButton
                                name="Reset defaults"
                                colorPalette="primary"
                                className="mx-auto"
                                onClick={() =>
                                    setCustomParameters(DEFAULT_PARAMETERS)
                                }
                            />
                        </div>
                    </div>
                </div>
            </Surface>
        </Transition>
    );
};
