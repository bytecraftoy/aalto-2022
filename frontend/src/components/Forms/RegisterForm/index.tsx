import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useValidation, useLogin, useTimedOpen } from '../../../utils/hooks';
import {
    registerUsernameSchema,
    registerPasswordSchema,
    registerTokenSchema,
} from '../validation';
import { CustomInput } from '../../Inputs';
import { useRepeatPassword } from '../hooks';
import { backendURL } from '../../../utils/backendURL';
import { Notification } from '../../Notification';
import { Account } from '../../../utils/types';
import { TemplateForm } from '..';
import { Header } from './Header';

/**
 *  Form for registering the user
 */
export const RegisterForm = () => {
    // Dynamic values
    const {
        value: username,
        errors: usernameErrors,
        setValue: setUsername,
    } = useValidation(registerUsernameSchema);
    const {
        value: password,
        errors: passwordErrors,
        setValue: setPassword,
    } = useValidation(registerPasswordSchema);
    const { repeatedPassword, repeatErrors, changeRepeated } =
        useRepeatPassword(password);
    const {
        value: token,
        errors: tokenErrors,
        setValue: setToken,
    } = useValidation(registerTokenSchema);

    const [params] = useSearchParams();

    // Try to read the registration key from the url when the page is opened for the first time
    useEffect(() => {
        setToken(params.get('key') ?? token);
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
            navigate('/projects');
        } else {
            // Set the error notification
            const text = await res.text();
            setError(text);
            setOpen(true);
        }
    };

    return (
        <TemplateForm
            submitText="Create account"
            submitDisabled={disabled}
            header={<Header />}
            onSubmit={submitForm}
        >
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
        </TemplateForm>
    );
};
