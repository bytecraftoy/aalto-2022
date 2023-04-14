import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { useValidation, useLogin, useTimedOpen } from '../../utils/hooks';
import { CustomInput } from '../Inputs';
import { FilledButton } from '../Buttons';
import { usernameSchema, passwordSchema, tokenSchema } from './validation';
import { useRepeatPassword } from './hooks';
import { backendURL } from '../../utils/backendURL';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../Notification';
import { Account } from '../../utils/types';
import { Surface } from '../Surface';
import { Divider } from '../Divider';

// A helper function to read query parameters from the current window location
const getQueryParameters = () => {
    const list = window.location.search
        .slice(1)
        .split('&')
        .map((s) => s.split('='));
    const out: Map<string, string> = new Map();
    for (const pair of list) out.set(pair[0], pair[1]);
    return out;
};

/**
 *  Form for registering the user
 */
export const RegisterForm = () => {
    // Dynamic values
    const {
        value: username,
        errors: usernameErrors,
        setValue: setUsername,
    } = useValidation(usernameSchema);
    const {
        value: password,
        errors: passwordErrors,
        setValue: setPassword,
    } = useValidation(passwordSchema);
    const { repeatedPassword, repeatErrors, changeRepeated } =
        useRepeatPassword(password);
    const {
        value: token,
        errors: tokenErrors,
        setValue: setToken,
    } = useValidation(tokenSchema);

    // Try to read the registration key from the url when the page is opened for the first time
    useEffect(() => {
        const queries = getQueryParameters();
        const key = queries.get('key');
        if (typeof key === 'string') setToken(key);
    }, []);

    // Open the notification
    const { open, setOpen } = useTimedOpen(7000);
    const [error, setError] = useState('');

    // Login once the user is registered
    const login = useLogin();

    // Navigation
    const navigate = useNavigate();

    // Disabled the submit button
    const disabled =
        usernameErrors !== '' || passwordErrors !== '' || repeatErrors !== '';

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Send register information to the backend
        const res = await fetch(`${backendURL}/api/user/register`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ name: username, password, key: token }),
        });

        if (res.status === 200) {
            const body = await res.json();

            const acc: Account = {
                username: body.userName,
                id: body.userID,
            };

            // Initiate a login on the frontend
            await login(acc);

            navigate('/');
        } else {
            // Set the error notification
            const text = await res.text();
            setError(text);
            setOpen(true);
        }
    };

    return (
        <Surface level={2} className="py-12 px-24 max-sm:px-8 max-sm:w-[80%]">
            <form
                className="flex flex-col items-center gap-10"
                onSubmit={submitForm}
            >
                <Header />

                <Divider />

                <Notification
                    isOpen={open}
                    close={() => setOpen(false)}
                    message={error}
                />

                <CustomInput
                    value={username}
                    label="Username"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUsername(e.target.value)
                    }
                    textHelper="Choose your username"
                    errors={usernameErrors}
                />
                <CustomInput
                    value={password}
                    label="Password"
                    type="password"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                    textHelper="Choose your password"
                    errors={passwordErrors}
                />
                <CustomInput
                    value={repeatedPassword}
                    label="Repeat password"
                    type="password"
                    onInput={changeRepeated}
                    textHelper="Please enter your password again"
                    errors={repeatErrors}
                />
                <CustomInput
                    value={token}
                    label="Key"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setToken(e.target.value)
                    }
                    textHelper="Enter the key"
                    errors={tokenErrors}
                />
                <FilledButton
                    name="Create account"
                    colorPalette="primary"
                    onClick={() => undefined}
                    className="justify-center"
                    type="submit"
                    disabled={disabled}
                />
            </form>
        </Surface>
    );
};
