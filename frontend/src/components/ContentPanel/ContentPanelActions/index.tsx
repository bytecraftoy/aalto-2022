import React from 'react';
import { Surface } from '../../Surface';

/**
 * Component of Content panel.
 * Contains the bottom bar with actions for generating data and exporting
 * content.
 */

interface ContentPanelActionsProps {
    name: string;
}
export const ContentPanelActions: React.FC<ContentPanelActionsProps> = ({
    name,
}) => {
    return <Surface level={5} className="h-20 w-full rounded-2xl"></Surface>;
};
