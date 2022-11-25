import fs from 'fs';
import { Prompt } from './../types/Prompt';

const exampleData: string = fs.readFileSync('example_data.txt').toString();

const generateData = (prompt: Prompt): string => {
    const time = new Date().toUTCString();
    return `${time}\n${prompt.prompt}\n${exampleData}`;
};

export { generateData };
