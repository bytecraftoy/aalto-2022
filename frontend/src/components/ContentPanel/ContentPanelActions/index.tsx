import React from 'react';
import { Surface } from '../../Surface';
import { FilledButton, SegmentedButtons } from '../../Buttons';

/**
 * Component of Content panel.
 * Contains the bottom bar with actions for generating data and exporting
 * content.
 */

interface ContentPanelActionsProps {
    generateAll: () => void;
    addPromptBoxes: (n: number) => void;
    exportJson: () => void;
    exportExcel: () => void;
}
export const ContentPanelActions: React.FC<ContentPanelActionsProps> = ({
    generateAll,
    addPromptBoxes,
    exportJson,
    exportExcel,
}) => {
    return (
        <Surface
            level={5}
            className="h-20 w-full rounded-2xl flex flex-row justify-between items-center"
        >
            <FilledButton
                onClick={generateAll}
                name="Generate all"
                colorPalette="primary"
            />
            <SegmentedButtons
                actions={[
                    { name: 'Add 5', onClick: event => addPromptBoxes(5) },
                    { name: 'Add 10', onClick: event => addPromptBoxes(10) },
                ]}
            />
            <SegmentedButtons
                actions={[
                    { name: 'json', onClick: exportJson },
                    { name: 'excel', onClick: exportExcel },
                ]}
            />
        </Surface>
    );
};
