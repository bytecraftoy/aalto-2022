/* eslint-disable no-console */
import fs from 'fs';
import { getRndString } from '../src/services';

const pw = getRndString(24);

if (fs.existsSync('.env')) {
    console.log('.env already exists');
    process.exit(0);
}

const body = fs.readFileSync('.env-sample').toString();

const res = body
    .split('\n')
    .map((v, _i, _a) => {
        if (v.startsWith('#POSTGRES_PASSWORD=')) {
            return `POSTGRES_PASSWORD=DEV-RAND-${pw}`;
        }
        return v;
    })
    .join('\n');

fs.writeFileSync('.env', res);
