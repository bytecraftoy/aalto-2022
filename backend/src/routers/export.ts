/**
 * A router for exporting data in JSON (and later in XLSX) format.
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

import express from 'express';
import { getRndString } from './../services/getRndString';

interface ExportDataObject {
    id: string;
    fileName: string;
    data: string;
}

const maxExportDataObjects = 5;
const exportDataObjects: ExportDataObject[] = [];

const exportRouter = express.Router();

exportRouter.post('/json/:name', (req, res) => {
    const fileName = decodeURIComponent(req.params.name);
    if (exportDataObjects.length >= maxExportDataObjects)
        exportDataObjects.shift();
    const id = getRndString(30);
    exportDataObjects.push({
        id,
        fileName,
        data: req.body as string,
    });
    res.send(id);
});

exportRouter.get('/json/:id/', (req, res) => {
    const id = req.params.id;
    const i = exportDataObjects.findIndex((o) => o.id === id);
    if (i === -1) {
        res.status(404).end(
            'No data found.\nIt may be already deleted from server memory.'
        );
        return;
    }
    const obj = exportDataObjects[i];
    exportDataObjects.splice(i, 1);
    res.setHeader(
        'Content-Disposition',
        `attachment; filename="${obj.fileName}"`
    );
    res.end(obj.data);
});

export { exportRouter };
