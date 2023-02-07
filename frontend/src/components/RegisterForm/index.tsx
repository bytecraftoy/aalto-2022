import React, { useState } from 'react';
import { Header } from './Header';
import { useValue } from '../../utils/hooks';
import { CustomInput } from '../Inputs';
import { FilledButton } from '../Buttons';
import { usernameSchema, passwordSchema } from './validation';
import { useRepeatPassword } from './hooks';
import { backendURL } from '../../utils/backendURL';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../reducers/userReducer';
import { setPanels } from '../../reducers/panelReducer';
import { Notification } from '../Notification';
import { useOpen } from '../../utils/hooks';
<<<<<<< HEAD
import { setProjects } from '../../utils/projects';
=======
import { Account } from '../../utils/types';
>>>>>>> main

/**
 *  Form for registering the user
 */
export const RegisterForm = () => {
    // Dynamic values
    const {
        value: username,
        errors: usernameErrors,
        setValue: setUsername,
    } = useValue(usernameSchema);
    const {
        value: password,
        errors: passwordErrors,
        setValue: setPassword,
    } = useValue(passwordSchema);
    const { repeatedPassword, repeatErrors, changeRepeated } =
        useRepeatPassword(password);

    // Get the panels from the store
    const panels = useAppSelector((state) => state.panels.value);

    // Open the notification
    const { open, setOpen } = useOpen(7000);
    const [error, setError] = useState('');

    // Navigation
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Disabled the submit button
    const disabled =
        usernameErrors !== '' || passwordErrors !== '' || repeatErrors !== '';

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Send register information to the backend
        const res = await fetch(`${backendURL}/api/user/register`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ name: username, password }),
        });

<<<<<<< HEAD
        if (res.status === 204) {
            dispatch(logIn());
            const backendPanels = await setProjects(panels);
            dispatch(setPanels(backendPanels));
=======
        if (res.status === 200) {
            const body = await res.json();

            const acc: Account = {
                username: body.userName,
                id: body.userID,
            };
            dispatch(logIn(acc));
>>>>>>> main
            navigate('/');
        } else {
            // Set the error notification
            const text = await res.text();
            setError(text);
            setOpen(true);
        }
    };

    return (
        <form className="flex flex-col w-72 gap-10" onSubmit={submitForm}>
            <Header />
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
            <FilledButton
                name="Create account"
                colorPalette="primary"
                onClick={() => undefined}
                className="justify-center"
                type="submit"
                disabled={disabled}
            />
        </form>
    );
};
