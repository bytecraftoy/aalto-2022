import fs from 'fs';
import { Gpt3Response } from '../types';

const exampleData: Gpt3Response[] = JSON.parse(
    fs.readFileSync('example_data.json').toString()
) as Gpt3Response[];

const generateData = (): Gpt3Response => {
    const time = Date.now();
    const data = exampleData[Math.floor(Math.random() * exampleData.length)];
    data.created = time;
    return data;
};

export { generateData };
