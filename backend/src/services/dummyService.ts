import { Prompt } from '../types/Prompt';
import axios from 'axios';

/**
 * Function assisting in prompt validation,
 * checks that all correct properties exist, returns boolean value
 *
 * @param {Object} json JavaScript objection preferably of type Prompt
 * @returns {Boolean}
 */
function correctPropertiesExist(json: any): json is Prompt {
    return (
        'model' in json &&
        'prompt' in json &&
        'temperature' in json &&
        'max_tokens' in json &&
        'top_p' in json &&
        'frequency_penalty' in json &&
        'presence_penalty' in json
    );
}

/**
 * Backend level validation of the json prompt.
 * Dummy performs more validations afterwards
 * Currently checks that the variable is an object
 * with the correct properties and only those.
 *
 * @param {Object} json JavaScript objection preferably of type Prompt
 * @returns {Boolean}
 */
const jsonValidation = (json: any) => {
    return (
        typeof json === 'object' &&
        correctPropertiesExist(json) &&
        Object.keys(json).length == 7
    );
};

/**
 * Function which sends data to dummy and recieves a response
 *
 * @async
 * @param {Object} json JavaScript object preferably of type Prompt
 * @returns {Object} returns response in object form as gpt3 would
 */
const sendToDummy = async (json: any) => {
    const response = await axios.post('localhost:8080', json); //replace url with variable?
    return response;
};

export { jsonValidation, sendToDummy };
