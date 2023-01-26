/**
 * File for augmenting the global CustomEvents
 * This allows TypeSafe CustomEvents in the application that are recognized globally in the project.
 */

declare global {
    interface CustomEventMap {
        logout: CustomEvent<string>;
    }
    interface Document {
        //adds definition to Document, but you can do the same with HTMLElement
        addEventListener<K extends keyof CustomEventMap>(
            type: K,
            listener: (this: Document, ev: CustomEventMap[K]) => void
        ): void;
        dispatchEvent<K extends keyof CustomEventMap>(
            ev: CustomEventMap[K]
        ): void;
    }
}
export {}; //keep that for TS compiler.
