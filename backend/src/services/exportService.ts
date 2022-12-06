/**
 * Functionalities required by the export router (/api/export/).
 *
 * Offers functions for handling data and saving it between requests during the export procedure.
 * The data is saved in dataObjects array in server's main memory (RAM).
 * Server storage is not used.
 */

import xlsx from 'xlsx';
import { getRndString } from './getRndString';

interface Box {
    id: string;
    input: string;
    output: string;
}

interface Panel {
    category: string;
    panels: Panel[];
    boxes: Box[];
}

interface ExportData {
    theme: string;
    panels: Panel[];
}

interface DataObject {
    id: string;
    fileName: string;
    data: Buffer;
}

//The IDs should be long enought to prevent random guessing
const idLenght = 30;

//The max number of data objects is limited to limit memory consumption
//However, this still doesn't limit the size of an individual data object
const maxDataObjects = 50;
const dataObjects: DataObject[] = [];

/**
 * Appends a new data object to dataObjects.
 * Removes the oldest object in the array if max length would be exceeded.
 */
const appendDataObject = (fileName: string, data: Buffer): string => {
    if (dataObjects.length >= maxDataObjects) dataObjects.shift();
    const id = getRndString(idLenght);
    dataObjects.push({ id, fileName, data });
    return id;
};

/**
 * Reads and removes a data object with corresponding ID from dataObjects.
 * The returned fileName and data will both be null if no data object was found.
 */
const readDataObject = (
    id: string
): { fileName: string | null; data: Buffer | null } => {
    const i = dataObjects.findIndex((o) => o.id === id);
    if (i === -1) return { fileName: null, data: null };
    const { fileName, data } = dataObjects[i];
    dataObjects.splice(i, 1);
    return { fileName, data };
};

/**
 * Recursively calculate the max depth of panel tree.
 * The returned number tells how many category columns will be required.
 */
const getMaxDepth = (panels: Panel[]): number => {
    let max = 0;
    for (const panel of panels) {
        const depth = 1 + getMaxDepth(panel.panels);
        if (depth > max) max = depth;
    }
    return max;
};

/**
 * Writes the column headers to an aoa.
 * The aoa is an array of arrays that represents an excel work sheet.
 */
const writeHeadersToAOA = (aoa: string[][], maxDepth: number): void => {
    const row = ['ID', 'Theme'];
    for (let i = 1; i <= maxDepth; i++) row.push(`Category_${i}`);
    row.push('Simple_Prompt', 'Output');
    aoa.push(row);
};

/**
 * Writes a row representing the box information to an aoa.
 * The aoa is an array of arrays that represents an excel work sheet.
 */
const writeBoxToAOA = (
    aoa: string[][],
    maxDepth: number,
    theme: string,
    categoryStack: string[],
    box: Box
): void => {
    const row = [box.id, theme, ...categoryStack];
    for (let i = maxDepth - categoryStack.length; i > 0; i--) row.push('');
    row.push(box.input, box.output);
    aoa.push(row);
};

/**
 * Recursively writes information of all panels to an aoa.
 * The aoa is an array of arrays that represents an excel work sheet.
 */
const writePanelsToAOA = (
    aoa: string[][],
    maxDepth: number,
    theme: string,
    categoryStack: string[],
    panels: Panel[]
): void => {
    for (const panel of panels) {
        const stack = categoryStack.concat(panel.category);
        for (const box of panel.boxes)
            writeBoxToAOA(aoa, maxDepth, theme, stack, box);
        writePanelsToAOA(aoa, maxDepth, theme, stack, panel.panels);
    }
};

/**
 * Generates an excel work sheet object.
 */
const generateSheet = (data: ExportData): xlsx.WorkSheet => {
    const maxDepth = getMaxDepth(data.panels);
    const aoa: string[][] = [];
    writeHeadersToAOA(aoa, maxDepth);
    writePanelsToAOA(aoa, maxDepth, data.theme, [], data.panels);
    return xlsx.utils.aoa_to_sheet(aoa);
};

/**
 * Generates a data buffer representing an xlsx file.
 * Does not perform any checks on the data.
 */
const generateXlsx = (data: ExportData): Buffer => {
    const wb = xlsx.utils.book_new();
    const ws = generateSheet(data);
    xlsx.utils.book_append_sheet(wb, ws);
    return xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
};

export { ExportData, generateXlsx, appendDataObject, readDataObject };
