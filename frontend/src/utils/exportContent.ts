import { apiFetch } from './apiFetch';
import { backendURL } from './backendURL';
import {
    ContentPanelData,
    Project,
    Theme,
    ExcelFormat,
    ExcelPanel,
} from './types';
import { v4 as uuidv4 } from 'uuid';

export interface panelExport {
    theme: Theme;
    panel: ContentPanelData;
}

// NOTE:
// If you examine what the export functions output, it's type should always be just Project
//
// When you are exporting the whole Project, you export the theme and all panels,
// and when exporting a single panel, you basically output an object containing the theme
// and a single panel.
// However, if you think about it, that's just the Project but with all other panels filtered out
// so the method signature could probably be simplified to just take a Project, and exporting a single
// panel would be simplified to taking the current project and just setting the panels[] = [currentPanel]

// Probably going make this change sometime later

export type exportProps = panelExport | Project;

/**
 * Send data to the backend in JSON format. This can be an individual panel
 * or a project containing all panels.
 *
 * Returns an identifier used to retrieve the exported file
 */
const exportJson = async (data: exportProps) => {
    const fileid = uuidv4();

    try {
        const response = await apiFetch(`/api/export/json/${fileid}.json`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return response;
    } catch (e) {
        console.error(e);
        return '';
    }
};

/**
 * Initiate a download for an exported json file
 */
const downloadJson = (link: string) => {
    window.open(`${backendURL}/api/export/json/${link}`, '_blank');
};

/**
 * Export data in Excel format. This can be an individual panel or a
 * project containing all panels
 */
const exportXlsx = async (data: exportProps) => {
    const fileid = uuidv4();

    // Conform the data to the format required by the Excel export api

    // Runtime check for type
    const projExport = data as Project;
    const panelExport = data as panelExport;
    const isProject = projExport.data !== undefined;

    // Map a ContentPanel to an equivalent ExcelPanel
    const mapPanel = (p: ContentPanelData): ExcelPanel => {
        return {
            category: p.category,
            panels: [],
            boxes: p.prompts,
        };
    };

    const obj: ExcelFormat = {
        theme: isProject ? projExport.data.theme.name : panelExport.theme.name,
        panels: isProject
            ? projExport.data.panels.map(mapPanel)
            : [mapPanel(panelExport.panel)],
    };

    try {
        const response = await apiFetch(`/api/export/xlsx/${fileid}.xlsx`, {
            method: 'POST',
            body: JSON.stringify(obj),
        });
        return response;
    } catch (e) {
        console.error(e);
        return '';
    }
};

/**
 * Initiate a download for an exported Excel file
 */
const downloadXlsx = (link: string) => {
    window.open(`${backendURL}/api/export/xlsx/${link}`, '_blank');
};

export { exportJson, downloadJson, exportXlsx, downloadXlsx };
