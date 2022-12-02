/**
 * Functionalities required by the export router (/api/export/).
 * 
 * Offers functions for handling data and saving it between requests during the export procedure.
 * The data is saved in dataObjects array in server's main memory (RAM).
 * Server storage is not used.
 */

import xlsx from 'xlsx';
import {getRndString} from './getRndString';

interface DataObject {
    id: string;
    fileName: string;
    data: Buffer
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
    if(dataObjects.length >= maxDataObjects)
        dataObjects.shift();
    const id = getRndString(idLenght);
    dataObjects.push({id, fileName, data});
    return id;
};

/**
 * Reads and removes a data object with corresponding ID from dataObjects.
 * The returned fileName and data will both be null if no data object was found.
 */
const readDataObject = (id: string): {fileName: string | null, data: Buffer | null} => {
    const i = dataObjects.findIndex(o => o.id === id);
    if(i === -1) return {fileName: null, data: null};
    const {fileName, data} = dataObjects[i];
    dataObjects.splice(i, 1);
    return {fileName, data};
};

const generateXlsx = (): Buffer => {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet([['Hello World!']]);
    xlsx.utils.book_append_sheet(wb, ws);
    return xlsx.write(wb, {type: 'buffer', bookType: 'xlsx'}) as Buffer;
};

export {
    generateXlsx,
    appendDataObject,
    readDataObject
};