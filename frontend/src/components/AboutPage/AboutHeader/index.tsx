import React, { useEffect, useState } from 'react';
import { ThemeInput } from './ThemeInput';
import { Theme } from '../../../utils/types';
import { solidIcon } from '../../../utils/icons';
import { Tooltip } from '../../Tooltip';
import { getStatus } from '../../../utils/status';
import { IconButton } from '../../Buttons';

/**
 * Top most part of the whole content panel.
 * Contains currently only place set set category box
 *
 */

interface AboutHeaderProps {
    theme: Theme;
    setThemeName: (s: string) => void;
    setDrawerOpen: (b: boolean) => void;
    saveState: () => void;
}

export const AboutHeader: React.FC<AboutHeaderProps> = ({
    theme,
    setThemeName,
    setDrawerOpen,
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
        <div className="relative flex flex-col justify-center items-center">
            <div className="w-full flex flex-row items-center justify-between">
                <div className="m-12">
                    <Tooltip
                        text={`Environment: ${status.environment}`}
                        icon="InformationCircleIcon"
                        instant={true}
                    >
                        {solidIcon('InformationCircleIcon', 'text-primary')}
                    </Tooltip>
                </div>

                <h1 className="text-center text-3xl pt-4 pb-6 block max-sm:hidden">
                    My game{"'"}s theme is ...
                </h1>

                <IconButton
                    icon="AdjustmentsHorizontalIcon"
                    colorPalette="primary"
                    onClick={() => setDrawerOpen(true)}
                    className="m-6"
                />
            </div>

            <h1 className="text-center text-3xl pt-4 pb-6 block sm:hidden">
                My game{"'"}s theme is ...
            </h1>

            <ThemeInput
                name={theme.name}
                setName={setThemeName}
                saveState={saveState}
            />
        </div>
    );
};
