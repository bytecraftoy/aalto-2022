import React from 'react';
import { Surface } from '../../Surface';
import { CustomButton } from '../../Buttons/ContainedButton';
import { SegmentedButtons } from '../../Buttons/SegmentedButton';

/**
 * Component of Content panel.
 * Contains the bottom bar with actions for generating data and exporting
 * content.
 */

interface ContentPanelActionsProps {
    generateAll: () => void
}
export const ContentPanelActions: React.FC<ContentPanelActionsProps> = ({
    generateAll,
}) => {
    return <Surface level={5} className="h-20 w-full rounded-2xl flex flex-row justify-between items-center">
                    <CustomButton
                        onClick={generateAll}
                        name="Generate"
                        color="primary"
                    />
    </Surface>;
};
