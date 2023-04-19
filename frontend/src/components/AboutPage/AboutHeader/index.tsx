import React, { useEffect, useState } from 'react';
import { ThemeInput } from './ThemeInput';
import { Theme, Parameters } from '../../../utils/types';
import { solidIcon } from '../../../utils/icons';
import { Tooltip } from '../../Tooltip';
import { getStatus } from '../../../utils/status';

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
    const [status, setStatus] = useState({ environment: 'loading...' });

    useEffect(() => {
        async function getEnvironment() {
            const env = await getStatus();
            setStatus(env);
        }
        getEnvironment();
    }, []);

    return (
        <div className="relative flex flex-col justify-center items-center my-6">
            <div className="absolute top-0 left-0 ml-6">
                <Tooltip
                    text={`Environment: ${status.environment}`}
                    icon="InformationCircleIcon"
                    instant={true}
                >
                    {solidIcon('InformationCircleIcon', 'text-primary')}
                </Tooltip>
            </div>
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
