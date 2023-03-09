import React from 'react';
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
    // Used later
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setThemeParameters,
    saveState,
}) => {
    return (
        <div className="flex flex-col justify-center items-center my-6">
            <div className="flex-1">
                <h1 className="text-center text-3xl pt-4 pb-6">
                    My game{"'"}s theme is ...
                </h1>
                <ThemeInput
                    name={theme.name}
                    setName={setThemeName}
                    saveState={saveState}
                />
            </div>
        </div>
    );
};
