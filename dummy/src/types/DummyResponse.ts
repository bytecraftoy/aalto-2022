import { Prompt, Gpt3Response } from '../types';

/**
 * Debug info that the dummy provides, but an actual
 * response from gpt3 would not contain
 */
interface DebugInfo {
    prompt: Prompt;
    date: string;
}

/**
 * A response returned from the dummy
 * In addition to returning a simulated Gpt3 response,
 * adds debug info such as date time string and received prompt
 */
interface DummyResponse {
    gpt: Gpt3Response;
    debug: DebugInfo;
}

export { DummyResponse, DebugInfo };
