/**
 * Event bus for logging user out of the application
 */

export const EventBus = {
    // Adds a new event listener to the DOM which listend to the logout CustomEvents
    on(
        event: keyof CustomEventMap,
        listener: (e: CustomEvent<string>) => void
    ) {
        document.addEventListener(event, listener);
    },
    /**
     *  Dispatches a new custom event.
     *  Used for logging user out of the application, e.g., sending after failed authentication, pressing log out etc.
     * @example
     * import { EventBus } from '../utils/EventBus'
     *
     * const Example = () => {
     * function onClick = () => {
     *  EventBus.dispatch('logout', 'message');
     * }
     * return (<button onClick={onClick}>Log out</button>);
     *
     * }
     * @param event
     * @param data
     */
    dispatch(event: keyof CustomEventMap, data: string) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    // Removes the EventListener
    remove(
        event: keyof CustomEventMap,
        listener: (e: CustomEvent<string>) => void
    ) {
        document.removeEventListener(event, listener as (e: Event) => void);
    },
};
