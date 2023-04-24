import React from 'react';
import { Surface } from '../../Surface';
import { FilledButton, SegmentedButtons } from '../../Buttons';
import { Tooltip } from '../../Tooltip';
import { solidIcon } from '../../../utils/icons';

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
            <Tooltip
                text="Generate content for all boxes that are not locked, or empty"
                icon="InformationCircleIcon"
            >
                <FilledButton
                    icon="ArrowPathIcon"
                    onClick={generateAll}
                    name="Generate all"
                    colorPalette="primary"
                />
            </Tooltip>

            <div className="flex flex-col justify-center items-center relative">
                <div className="flex flex-row pb-2">
                    <h3 className="text-lg font-medium">Export content</h3>
                    <Tooltip
                        text="Export content in json or excel format"
                        icon="InformationCircleIcon"
                        floatRight
                        instant
                    >
                        {solidIcon(
                            'InformationCircleIcon',
                            'inline-block ml-2 text-neutral-30'
                        )}
                    </Tooltip>
                </div>
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
