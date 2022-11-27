/**
 * Convinience file containing type definitions for readability
 */

/** Type returned by useState() : (A | (prev: A) => A) => void */
export type StateHook<A> = React.Dispatch<React.SetStateAction<A>>;

//ApiRequest and ApiResponse types taken from backend

export interface ApiRequest {
    contexts: string[];
    prompt: string;
    id: string;
}

export interface ApiResponse {
    result: string;
    id: string;
}
