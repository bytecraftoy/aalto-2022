import { Gpt3Response, DummyResponse, Prompt, ApiResponse } from '../types';
import { getRndString } from './getRndString';
import axios from 'axios';

class ProxyError extends SyntaxError {
    name = 'ProxyError';
}

/**
 * Function which sends data to proxy, or dummy and receives a response
 *
 * @async
 * @param {Prompt} json JavaScript object preferably of type Prompt
 * @returns {Promise<Gpt3Response>} returns response in object form as gpt3 would
 */
const sendToProxy = async (json: Prompt): Promise<Gpt3Response> => {
    //Send to proxy if environment is 'openai'
    //Otherwise, expect that we are using the dummy
    //Currently, both expect the service available at port 8080
    if (process.env.ENVIRONMENT === 'openai') {
        try {
            //send to real proxy here, response should be of type Gpt3Response
            const response = await axios.post<Gpt3Response>(
                'http://localhost:8080',
                json
            );
            return response.data;
        } catch (e) {
            throw new ProxyError(
                'Error when processing response from proxy\n' +
                    (e as SyntaxError).message
            );
        }
    } else {
        try {
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
        } catch (e) {
            throw new ProxyError(
                'Error when processing response from dummy\n' +
                    (e as SyntaxError).message
            );
        }
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

export { sendToProxy, responseGen, ProxyError };
