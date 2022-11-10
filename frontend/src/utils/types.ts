/**
 * Convinience file containing type definitions for readability
 */

/** Type returned by useState() : (A | (prev: A) => A) => void */
export type StateHook<A> = React.Dispatch<React.SetStateAction<A>>;
