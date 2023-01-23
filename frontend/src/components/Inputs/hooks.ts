import { useState } from 'react';

/**
 * Custom hook which gives the boolean showError which tells if the state of the input has an error
 * and function touchInput which sets touched property to true
 *
 */
export const useError = (errors: string | undefined) => {
    const [touched, setTouched] = useState(false);

    const showError: boolean =
        touched && errors != undefined && errors.length > 0;

    const touchInput = () => setTouched(true);

    return { showError, touchInput };
};
