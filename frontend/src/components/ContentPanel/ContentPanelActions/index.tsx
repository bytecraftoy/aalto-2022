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
    exportJson: () => void;
    exportExcel: () => void;
}
export const ContentPanelActions: React.FC<ContentPanelActionsProps> = ({
    generateAll,
    exportJson,
    exportExcel,
}) => {
    return (
        <Surface
            level={5}
            className="w-full rounded-2xl flex flex-row justify-between items-end p-4"
        >
            <FilledButton
                icon="ArrowPathIcon"
                onClick={generateAll}
                name="Generate all"
                colorPalette="primary"
            />
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-lg font-medium pb-2">Export content</h3>
                <SegmentedButtons
                    actions={[
                        { name: 'json', onClick: exportJson },
                        { name: 'excel', onClick: exportExcel },
                    ]}
                />
            </div>
        </Surface>
    );
};
