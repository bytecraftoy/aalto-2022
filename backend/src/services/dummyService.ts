import { Prompt } from '../types/Prompt';
import { ApiRequest } from '../types/ApiTypes';
import { Gpt3Response } from '../types/Gpt3Response';
import axios from 'axios';

/**
 * Function assisting in prompt validation,
 * checks that all correct properties exist, returns boolean value
 *
 * @param {ApiRequest} json
 * @returns {Boolean}
 */
function correctPropertiesExist(json: ApiRequest): json is ApiRequest {
    return 'contexts' in json && 'prompt' in json && 'id' in json;
}

/**
 * Backend level validation of the json prompt.
 * Dummy performs more validations afterwards
 * Currently checks that the variable is an object
 * with the correct properties and only those.
 *
 * @param {ApiRequest} json JavaScript objection preferably of type Prompt
 * @returns {Boolean}
 */
const jsonValidation = (json: ApiRequest) => {
    return (
        typeof json === 'object' &&
        correctPropertiesExist(json) &&
        Object.keys(json).length == 3
    );
};

/**
 * turns the ApiRequest into proper Prompt format
 * @param {ApiRequest} req
 * @returns {Prompt}
 */
const promptGen = (req: ApiRequest) => {
    const prompt = {
        model: 'text-davinci-002',
        prompt: req.prompt,
        temperature: 0.5,
        max_tokens: 2000,
        top_p: 1.0,
        frequency_penalty: 0.52,
        presence_penalty: 0.5,
    };
    return prompt;
};

/**
 * Function which sends data to dummy and recieves a response
 *
 * @async
 * @param {Prompt} json JavaScript object preferably of type Prompt
 * @returns {Gpt3Response} returns response in object form as gpt3 would
 */
const sendToDummy = async (json: Prompt) => {
    const response: Gpt3Response = await axios.post('localhost:8080', json); //possible TODO: replace url with env variable
    return response;
};

/**
 * generates response to send to frontend
 * @param {Gpt3Response} req
 * @param {string} id The same id that was used in the frontend request
 * @returns {ApiResponse}
 */
const responseGen = (response: Gpt3Response, id: string) => {
    const result = response.choices[0].text;
    return {
        result: result,
        id: id,
    };
};

export { jsonValidation, sendToDummy, promptGen, responseGen };
