import { Gpt3Response, Prompt, ApiResponse } from '../types';
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
    try {
            const proxyURL = process.env.ENVIRONMENT === 'openai'
                ? process.env.PROXYURL as string
                : process.env.DUMMYURL as string;
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
