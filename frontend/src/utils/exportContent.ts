import { apiFetch } from './apiFetch';
import { backendURL } from './backendURL';
import { ContentPanelData, Project } from './types';
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

    try {
        const response = await apiFetch(`/api/export/xlsx/${fileid}.xlsx`, {
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
 * Initiate a download for an exported Excel file
 */
const downloadXlsx = (link: string) => {
    window.open(`${backendURL}/api/export/xlsx/${link}`, '_blank');
};

export { exportJson, downloadJson, exportXlsx, downloadXlsx };
