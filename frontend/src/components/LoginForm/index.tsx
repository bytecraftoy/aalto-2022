import React from 'react';
import { CustomInput } from '../Inputs';
import { FilledButton, TextButton } from '../Buttons';
import { useNavigate } from 'react-router-dom';
import { usernameSchema, passwordSchema } from './validation';
import { useValidation, useLogin, useTimedOpen } from '../../utils/hooks';
import { Notification } from '../Notification';
import { backendURL } from '../../utils/backendURL';
import { Account } from '../../utils/types';

/**
 *
 * Form to log in to the application
 *
 */

export const LoginForm = () => {
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

    // If the error message of the user is shown
    const { open, setOpen } = useTimedOpen(7000);

    // Hook to login and update user data
    const login = useLogin();

    // Disables the submit button
    const disabled = usernameErrors !== '' || passwordErrors !== '';

    // Navigation
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = React.useState<string>('');

    //Submits the login form
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Sends the credentials to the backend
        const res = await fetch(`${backendURL}/api/user/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ name: username, password }),
        });

        // If correct username and password, then login the user and navigate to the project
        if (res.status === 200) {
            const body = await res.json();

            const acc: Account = {
                username: body.userName,
                id: body.userID,
            };

            // Initiate a login on the frontend
            login(acc);

            // Navigates to the project main panel
            navigate('/');
        } else {
            const text = await res.text();
            setErrorMsg(text);
            setOpen(true);
            setPassword('');
        }
    };

    return (
        <form className="flex flex-col w-72 gap-10" onSubmit={submitForm}>
            <div>
                <h1 className=" font-semibold text-3xl text-center pb-3">
                    Log in
                </h1>
                <div className="w-full h-px bg-black" />
            </div>
            <Notification
                isOpen={open}
                close={() => setOpen(false)}
                message={errorMsg}
            />
            <CustomInput
                type="text"
                label="Username"
                textHelper="Please enter your username"
                value={username}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                }
                errors={usernameErrors}
            />
            <CustomInput
                type="password"
                label="Password"
                textHelper="Please enter your password"
                value={password}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                }
                errors={passwordErrors}
            />
            <div className="flex flex-col gap-2">
                <FilledButton
                    name="Log in"
                    colorPalette="primary"
                    onClick={() => undefined}
                    className="justify-center"
                    type="submit"
                    disabled={disabled}
                />
                <TextButton
                    name="Click here to register"
                    colorPalette="primary"
                    onClick={() => navigate('/register')}
                    className="justify-center m-0"
                />
            </div>
        </form>
    );
};
