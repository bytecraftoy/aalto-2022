import React from 'react';
import { CustomInput } from '../../Inputs';
import { useNavigate } from 'react-router-dom';
import { TextButton } from '../../Buttons';
import { loginUsernameSchema, loginPasswordSchema } from '../validation';
import { useValidation, useLogin, useTimedOpen } from '../../../utils/hooks';
import { Notification } from '../../Notification';
import { backendURL } from '../../../utils/backendURL';
import { Account } from '../../../utils/types';
import { TemplateForm } from '..';
import { Header } from './Header';

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
    } = useValidation(loginUsernameSchema);
    const {
        value: password,
        errors: passwordErrors,
        setValue: setPassword,
    } = useValidation(loginPasswordSchema);

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
            await login(acc);

            // Navigates to user's project page
            navigate('/projects');
        } else {
            const text = await res.text();
            setErrorMsg(text);
            setOpen(true);
            setPassword('');
        }
    };

    return (
        <TemplateForm
            header={<Header />}
            submitText="Log in"
            submitDisabled={disabled}
            onSubmit={submitForm}
        >
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

            <TextButton
                name="Click here to register"
                colorPalette="primary"
                onClick={() => navigate('/register')}
                className="justify-center m-0"
            />
        </TemplateForm>
    );
};
