import fs from 'fs';
import { AIResponse } from '../types/AIResponse';

const exampleData: AIResponse[] = JSON.parse(
    fs.readFileSync('example_data.json').toString()
) as AIResponse[];

const generateData = (): AIResponse => {
    const time = new Date().valueOf();
    const data = exampleData[Math.floor(Math.random() * exampleData.length)];
    data.created = time;
    return data;
};

export { generateData };
