/**
 * A router for exporting data in JSON and XLSX format.
 *
 * Front end sends a POST request to correct path on this router
 * and receives an ID in the response body.
 * The ID can be later used to fetch the downloadable file with a GET request.
 *
 * The max amount of IDs and corresponding data objects
 * the router can hold in memory is limited.
 * Those will be remod from memory once they have been requested
 * or if saving newer data objects would exceed the fixed max limit.
 */

import express, { Request, Response } from 'express';
import {
    generateXlsx,
    appendDataObject,
    readDataObject,
    ExportData,
} from './../services/exportService';
import { logger } from '../utils/logger';

const exportRouter = express.Router();

exportRouter.post('/json/:name', (req, res) => {
    const fileName = decodeURIComponent(req.params.name);
    const data = Buffer.from(req.body as string, 'utf-8');
    const id = appendDataObject(fileName, data);
    res.send(id);
});

exportRouter.post('/xlsx/:name', (req, res) => {
    const fileName = decodeURIComponent(req.params.name);
    /**
     * No validation is done for the request body
     * since it is not used for anything sensitive in the server.
     * If generating the xlsx file fails 400 is sent as a response.
     */
    try {
        const data = generateXlsx(JSON.parse(req.body as string) as ExportData);
        const id = appendDataObject(fileName, data);
        res.send(id);
    } catch (e) {
        logger.error(e);
        res.status(400).end();
    }
});

const sendData = (req: Request<{ id: string }>, res: Response): void => {
    const { fileName, data } = readDataObject(req.params.id);
    if (fileName === null) {
        res.status(404).end(
            'No data found.\nIt may be already deleted from server memory.'
        );
    } else {
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${fileName}"`
        );
        res.end(data);
    }
};

exportRouter.get('/json/:id/', sendData);

exportRouter.get('/xlsx/:id/', sendData);

export { exportRouter };
