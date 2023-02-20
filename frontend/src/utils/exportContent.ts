import { apiFetch } from './apiFetch';
import { backendURL } from './backendURL';
import { ContentPanelData, Project, ExcelFormat, ExcelPanel } from './types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Send data to the backend in JSON format. This can be an individual panel
 * or a project containing all panels.
 *
 * Returns an identifier used to retrieve the exported file
 */
const exportJson = async (data: ContentPanelData | Project) => {
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
const exportXlsx = async (data: ContentPanelData | Project) => {
    const fileid = uuidv4();

    // Conform the data to the format required by the Excel export api

    // Runtime check for type
    const proj = data as Project;
    const isProject = proj.data !== undefined;

    // Map a ContentPanel to an equivalent ExcelPanel
    const mapPanel = (p: ContentPanelData): ExcelPanel => {
        return {
            category: p.category,
            panels: [],
            boxes: p.prompts,
        };
    };

    const obj: ExcelFormat = {
        theme: isProject ? proj.data.theme.name : '',
        panels: isProject
            ? proj.data.panels.map(mapPanel)
            : [mapPanel(data as ContentPanelData)],
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
