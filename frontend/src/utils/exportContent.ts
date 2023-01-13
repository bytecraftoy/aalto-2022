import { apiFetch } from './apiFetch';
import { backendURL } from './backendURL';
import { PromptData } from '../components/PromptIOBox';
import { v4 as uuidv4 } from 'uuid';

/**
 * Send AI generated data to the backend in JSON format.
 * Returns an identifier used to retrieve the exported file
 */
const exportJson = async (category: string, boxes: PromptData[]) => {
    const fileid = uuidv4();
    const obj = {
        category: category,
        prompts: boxes,
    };

    try {
        const response = await apiFetch(`/api/export/json/${fileid}.json`, {
            method: 'POST',
            body: JSON.stringify(obj),
        });
        return response;
    } catch (e) {
        console.error(e);
        return '';
    }
};

const downloadJson = (link: string) => {
    window.open(`${backendURL}/api/export/json/${link}`, '_blank');
};

/**
 * Excel export functions for a single panel,
 */
const exportXlsx = async (category: string, boxes: PromptData[]) => {
    const fileid = uuidv4();
    const obj = {
        theme: '',
        panels: [
            {
                category: category,
                panels: [],
                boxes: boxes,
            },
        ],
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

const downloadXlsx = (link: string) => {
    window.open(`${backendURL}/api/export/xlsx/${link}`, '_blank');
};

export { exportJson, downloadJson, exportXlsx, downloadXlsx };
