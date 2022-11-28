import { Gpt3Response, DummyResponse, Prompt, ApiResponse } from '../types';
import { getRndString } from './getRndString';
import axios from 'axios';

/**
 * Function which sends data to proxy, or dummy and receives a response
 * Re
 *
 * @async
 * @param {Prompt} json JavaScript object preferably of type Prompt
 * @returns {Promise<Gpt3Response>} returns response in object form as gpt3 would
 */
const sendToProxy = async (json: Prompt): Promise<Gpt3Response> => {
    //Send to proxy if environment is 'openai'
    //Otherwise, expect that we are using the dummy
    if (process.env.ENVIRONMENT === 'openai') {
        //send to real api here, currently throws an error
        //Response here should be of type Gpt3Response
        throw 'Tried to use proxy, but it is not yet available to the backend';
    } else {
        //dummy
        const response = await axios.post<DummyResponse>(
            'http://localhost:8080',
            json
        );

        const { gpt, debug } = response.data;
        //Do some logging, then return the actual gpt3 response with stuff appended
        console.log(
            `Replied to prompt:\n"${debug.prompt.prompt}"\nDate: ${debug.date}`
        );
        const debugText = `This is a demo prompt generated using a dummy backend
Date: ${debug.date}
Prompt: ${JSON.stringify(debug.prompt)}
id: ${getRndString(32)}`;

        gpt.choices[0].text = debugText + gpt.choices[0].text;
        return gpt;
    }
};

/**
 * generates response to send to frontend
 * @param {Gpt3Response} gpt Response returned from Gpt3
 * @param {string} id The same id that was used in the frontend request
 * @returns {ApiResponse}
 */
const responseGen = (gpt: Gpt3Response, id: string): ApiResponse => {
    const text = gpt.choices.length ? gpt.choices[0].text : 'No text generated';
    return {
        result: text,
        id: id,
    };
};

export { sendToProxy, responseGen };