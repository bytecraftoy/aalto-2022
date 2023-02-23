import React from 'react';
import { DropdownMenu } from '../../DropdownMenu';
import { ThemeInput } from './ThemeInput';
import { Theme, Parameters } from '../../../utils/types';

/**
 * Top most part of the whole content panel.
 * Contains currently only place set set category box
 *
 */

interface AboutHeaderProps {
    theme: Theme;
    setThemeName: (s: string) => void;
    setThemeParameters: (p: Parameters) => void;
    saveState: () => void;
}

export const AboutHeader: React.FC<AboutHeaderProps> = ({
    theme,
    setThemeName,
    setThemeParameters,
    saveState,
}) => {
    return (
        <div className="flex flex-row justify-around items-center my-6">
            <div className="flex flex-row justify-around items-center">
                <div className="flex-1">
                    <h1 className="text-center text-3xl py-4">
                        My game is a...
                    </h1>
                    <ThemeInput
                        name={theme.name}
                        setName={setThemeName}
                        saveState={saveState}
                    />
                </div>
                <div className="flex-1 z-[15] pl-8"></div>
            </div>
        </div>
    );
};
