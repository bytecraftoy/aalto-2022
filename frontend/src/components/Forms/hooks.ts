import { z } from 'zod';
import React, { useState } from 'react';

/**
 * Custom hook for checking that passwords match
 */
export const useRepeatPassword = (password: string) => {
    const [repeatedPassword, setRepeated] = useState('');

    const schema = z
        .string()
        .trim()
        .refine((data) => data === password, {
            message: 'Passwords do not match',
        });

    let repeatErrors = '';

    const validated = schema.safeParse(repeatedPassword);
    if (!validated.success) {
        const formatted = validated.error.format();
        repeatErrors = formatted._errors.join(', ');
    }

    const changeRepeated = (e: React.ChangeEvent<HTMLInputElement>) =>
        setRepeated(e.target.value);

    return { repeatedPassword, repeatErrors, changeRepeated };
};
