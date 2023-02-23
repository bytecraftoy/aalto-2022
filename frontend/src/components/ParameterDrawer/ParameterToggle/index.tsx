import React from 'react';
import { Toggle } from '../../Toggle';

interface ParameterToggleProps {
    title: string;
    enabled: boolean;
    setEnabled: (b: boolean) => void;
}

export const ParameterToggle: React.FC<ParameterToggleProps> = ({
    title,
    enabled,
    setEnabled,
}) => {
    return (
        <div className="w-full flex flex-row justify-between items-center py-6 px-4">
            <h3 className="font-medium text-lg">{title}</h3>
            <Toggle
                enabled={enabled}
                setEnabled={setEnabled}
                colorPalette="primary"
            />
        </div>
    );
};
