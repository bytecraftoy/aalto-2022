/**
 * generates dummy prompt, which contains metadata along with a random text generation
 */
import fs from 'fs';
import { Gpt3Response, Prompt } from '../types';
import { getRndString } from './getRndString';

const exampleData: Gpt3Response[] = JSON.parse(
    fs.readFileSync('example_data.json').toString()
) as Gpt3Response[];

const generateData = (prompt: Prompt): Gpt3Response => {
    const time = new Date().toUTCString();

    //Do some logging, then generate the actual gpt3 response with stuff appended
    console.log(
        `Replying to prompt:\n"${JSON.stringify(prompt)}"\nDate: ${time}`
    );

    const data = exampleData[Math.floor(Math.random() * exampleData.length)];
    data.created = Date.now();
    const debugText = `This is a demo prompt generated using a dummy backend
Date: ${time}
Prompt: ${JSON.stringify(prompt)}
id: ${getRndString(32)}`;
    const generatedData = data;
    generatedData.choices[0].text = debugText + generatedData.choices[0].text;
    return data;
};

export { generateData };
