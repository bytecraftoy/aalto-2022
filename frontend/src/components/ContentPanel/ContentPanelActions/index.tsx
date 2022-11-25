import React from 'react';
import { Surface } from '../../Surface';
import { CustomButton } from '../../Buttons';
import { SegmentedButtons } from '../../Buttons';

/**
 * Component of Content panel.
 * Contains the bottom bar with actions for generating data and exporting
 * content.
 */

interface ContentPanelActionsProps {
    generateAll: () => void;
}
export const ContentPanelActions: React.FC<ContentPanelActionsProps> = ({
    generateAll,
}) => {
    const exportFunc = () => console.log('Not implemented');
    return (
        <Surface
            level={5}
            className="h-20 w-full rounded-2xl flex flex-row justify-between items-center"
        >
            <CustomButton
                onClick={generateAll}
                name="Generate content"
                color="primary"
            />
            <SegmentedButtons
                names={['json', 'excel']}
                onClicks={[exportFunc, exportFunc]}
            />
        </Surface>
    );
};
