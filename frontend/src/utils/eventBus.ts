import { z } from 'zod';

// Data thatg can passed to the EventBus
type EventData = string | NotificationObj;

const NotificationSchema = z.object({
    type: z.enum(['success', 'error']),
    message: z.string(),
});

/**
 * Event bus for logging user out of the application
 */

export const EventBus = {
    // Adds a new event listener to the DOM which listend to the logout CustomEvents
    on(event: keyof CustomEventMap, listener: (e: CustomEvent) => void) {
        document.addEventListener(event, listener);
    },
    /**
     *  Dispatches a new custom event.
     *  Can be used to send logout or notification event.
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
    dispatch(event: keyof CustomEventMap, data: EventData) {
        switch (event) {
            case 'logout': {
                const validated = z.string().safeParse(data);
                if (validated.success) {
                    document.dispatchEvent(
                        new CustomEvent(event, { detail: validated.data })
                    );
                }
                break;
            }
            case 'notification': {
                const validated = NotificationSchema.safeParse(data);
                if (validated.success) {
                    document.dispatchEvent(
                        new CustomEvent(event, {
                            detail: data as NotificationObj,
                        })
                    );
                }
                break;
            }
            default:
                return;
        }
    },
    // Removes the EventListener
    remove(event: keyof CustomEventMap, listener: (e: CustomEvent) => void) {
        document.removeEventListener(event, listener as (e: Event) => void);
    },
};
