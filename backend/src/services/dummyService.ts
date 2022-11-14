import { Prompt } from '../types/Prompt';

/**
 * Function assisting in prompt validation,
 * checks that all correct properties exist, returns boolean value.
 * @params
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
 */
const jsonValidation = (json: any) => {
    return (
        typeof json === 'object' &&
        correctPropertiesExist(json) &&
        Object.keys(json).length == 7
    );
};

/**
 *Function which sends data to dummy and recieves a response.
 */
const sendToDummy = async (json: any) => {
    //Communication to dummy backend (how?)

    //placeholder await function to make linter shut up
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1000);
    return 'hello from dummyService: ' + json;
};

export { jsonValidation, sendToDummy };
