import { Gpt3Response, Prompt, ApiResponse } from '../types';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

class ProxyError extends SyntaxError {
    name = 'ProxyError';
}

/**
 * Function which sends data to proxy if in 'openai' environment,
 * otherwise, send data to internal dummy proxy.
 *
 * @async
 * @param {Prompt} json JavaScript object preferably of type Prompt
 * @returns {Promise<Gpt3Response>} returns response in object form as gpt3 would
 */
const sendToProxy = async (json: Prompt): Promise<Gpt3Response> => {
    try {
        const proxyURL =
            process.env.ENVIRONMENT === 'openai'
                ? (process.env.PROXYURL as string)
                : (process.env.DUMMYURL as string);
        const response = await axios.post<Gpt3Response>(proxyURL, json);
        return response.data;
    } catch (e) {
        throw new ProxyError(
            'Error connecting to or when processing response from proxy\n' +
                (e as SyntaxError).message
        );
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
