/**
 * tests xlxs/json export functionality
 */
import supertest from 'supertest';
import crypto from 'crypto';
import xlsx from 'xlsx';
import { app } from '../app';
import { initializeUsers, getUserToken } from './../services/testService';

const api = supertest(app);

beforeEach(async () => {
    await initializeUsers();
});

describe('json export router', () => {
    const data = '{"a":[1, 2],"b":true}';
    const fileName = 'file.json';

    test('is not available for anonymous users', async () => {
        await api.get('/api/export/json/abc/').expect(401);
    });

    test('handles incorrect IDs', async () => {
        const cookie = await getUserToken(api);
        await api
            .get('/api/export/json/abc/')
            .set('Cookie', cookie)
            .expect(404);
    });

    test('saves and servers and deletes data correctly', async () => {
        const cookie = await getUserToken(api);
        let res = await api
            .post('/api/export/json/' + fileName)
            .set('Cookie', cookie)
            .send(data)
            .expect(200);

        const id = res.text;

        expect(typeof id).toBe('string');
        expect(id.length >= 16).toBe(true);

        res = await api
            .get(`/api/export/json/${id}/`)
            .set('Cookie', cookie)
            .expect(200);
        expect(res.headers['content-disposition']).toBe(
            `attachment; filename="${fileName}"`
        );
        expect(res.text).toBe(data);

        await api
            .get(`/api/export/json/${id}/`)
            .set('Cookie', cookie)
            .expect(404);
    });
});

const exportData = {
    theme: 'cyberpunk',
    panels: [
        {
            category: 'weapons',
            panels: [
                {
                    category: 'firearms',
                    panels: [],
                    boxes: [
                        {
                            id: crypto.randomUUID(),
                            input: 'rifle',
                            output: 'rifle output',
                        },
                        {
                            id: crypto.randomUUID(),
                            input: 'pistol',
                            output: 'pistol output',
                        },
                    ],
                },
                {
                    category: 'swords',
                    panels: [],
                    boxes: [
                        {
                            id: crypto.randomUUID(),
                            input: 'katana',
                            output: 'katana output',
                        },
                    ],
                },
            ],
            boxes: [
                {
                    id: crypto.randomUUID(),
                    input: 'grenade',
                    output: 'grenade output',
                },
            ],
        },
        {
            category: 'vehicles',
            panels: [],
            boxes: [
                {
                    id: crypto.randomUUID(),
                    input: 'car',
                    output: 'car output',
                },
            ],
        },
    ],
};

interface RowObject {
    ID: string;
    Theme: string;
    Category_1: string;
    Category_2: string;
    Simple_Prompt: string;
    Output: string;
}

const xlsxData: RowObject[] = [
    {
        ID: exportData.panels[0].boxes[0].id,
        Theme: 'cyberpunk',
        Category_1: 'weapons',
        Category_2: '',
        Simple_Prompt: 'grenade',
        Output: 'grenade output',
    },
    {
        ID: exportData.panels[0].panels[0].boxes[0].id,
        Theme: 'cyberpunk',
        Category_1: 'weapons',
        Category_2: 'firearms',
        Simple_Prompt: 'rifle',
        Output: 'rifle output',
    },
    {
        ID: exportData.panels[0].panels[0].boxes[1].id,
        Theme: 'cyberpunk',
        Category_1: 'weapons',
        Category_2: 'firearms',
        Simple_Prompt: 'pistol',
        Output: 'pistol output',
    },
    {
        ID: exportData.panels[0].panels[1].boxes[0].id,
        Theme: 'cyberpunk',
        Category_1: 'weapons',
        Category_2: 'swords',
        Simple_Prompt: 'katana',
        Output: 'katana output',
    },
    {
        ID: exportData.panels[1].boxes[0].id,
        Theme: 'cyberpunk',
        Category_1: 'vehicles',
        Category_2: '',
        Simple_Prompt: 'car',
        Output: 'car output',
    },
];

const objectsAreEqual = (a: RowObject, b: RowObject): boolean => {
    return (
        a.ID === b.ID &&
        a.Theme === b.Theme &&
        a.Category_1 === b.Category_1 &&
        a.Category_2 === b.Category_2 &&
        a.Simple_Prompt === b.Simple_Prompt &&
        a.Output === b.Output
    );
};

const arraysAreEqual = (a: RowObject[], b: RowObject[]): boolean => {
    return (
        a.length === b.length &&
        a.every((o) => b.some((o2) => objectsAreEqual(o, o2)))
    );
};

const isCorrectXLSX = (file: Buffer): boolean => {
    const wb = xlsx.read(file, {});
    if (wb.SheetNames.length !== 1) return false;
    const ws = wb.Sheets[wb.SheetNames[0]];
    const json = xlsx.utils.sheet_to_json(ws);
    return arraysAreEqual(json as RowObject[], xlsxData);
};

describe('xlsx export router', () => {
    const fileName = 'file.xlsx';

    test('is not available for anonymous users', async () => {
        await api.get('/api/export/xlsx/abc/').expect(401);
    });

    test('handles incorrect IDs', async () => {
        const cookie = await getUserToken(api);
        await api
            .get('/api/export/xlsx/abc/')
            .set('Cookie', cookie)
            .expect(404);
    });

    test('saves and servers and deletes data correctly', async () => {
        const cookie = await getUserToken(api);
        let res = await api
            .post('/api/export/xlsx/' + fileName)
            .set('Cookie', cookie)
            .send(JSON.stringify(exportData))
            .expect(200);

        const id = res.text;

        expect(typeof id).toBe('string');
        expect(id.length >= 16).toBe(true);

        res = await api
            .get(`/api/export/xlsx/${id}/`)
            .set('Cookie', cookie)
            .responseType('blob')
            .expect(200);
        expect(res.headers['content-disposition']).toBe(
            `attachment; filename="${fileName}"`
        );
        expect(isCorrectXLSX(res.body as Buffer)).toBe(true);

        await api
            .get(`/api/export/xlsx/${id}/`)
            .set('Cookie', cookie)
            .expect(404);
    });
});
