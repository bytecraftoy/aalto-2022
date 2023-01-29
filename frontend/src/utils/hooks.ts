import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import type { RootState, AppDispatch } from '../store';
import { clear } from 'console';

// Used instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Custom hook for input element which validates the value: string with Zod schema
 * Return the useState value, errors and function for changing the value
 * @example
 * const stringSchema = z.string().min(4)
 * const { value: username, errors: usernameErrors, changeValue: changeUsername} = useValue(stringSchema)
 *
 */
export const useValue = (schema?: Zod.ZodType) => {
    // Value to keep track of
    const [value, setValue] = useState('');

    // Errors of the value
    let errors = '';

    if (schema) {
        const validated = schema.safeParse(value);
        if (!validated.success) {
            const formattedErrors = validated.error.format();
            errors = formattedErrors._errors.join(', ');
        }
    }

    return { value, errors, setValue };
};

/**
 * Custom hook which closes after N milliseconds
 */
export const useOpen = (time: number) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setOpen(false), time);

        return () => {
            clearTimeout(timer);
        };
    }, [open]);

    return { open, setOpen };
};
