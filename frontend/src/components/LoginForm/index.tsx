import React, { useState } from 'react';
import { CustomInput } from '../Input';
import { FilledButton, TextButton } from '../Buttons';
import { useUsername } from './hook';
import { useNavigate } from 'react-router-dom';

/**
 *
 * Form for log in to the application
 *
 */

export const LoginForm = () => {
    const { username, changeUsername } = useUsername();
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    //Submits the login form
    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(username, password);
    };

    return (
        <form
            className="flex flex-col w-72 justify-between gap-10"
            onSubmit={submitForm}
        >
            <h1 className=" font-semibold text-3xl text-center">Log in</h1>
            <CustomInput
                type="text"
                label="Username"
                textHelper="Please enter your username"
                value={username}
                required
                onInput={changeUsername}
            />
            <CustomInput
                type="password"
                label="Password"
                textHelper="Please enter your password"
                value={password}
                required
                onInput={({ target }) =>
                    setPassword((target as HTMLInputElement).value)
                }
            />
            <div className="flex flex-col gap-2.5">
                <FilledButton
                    name="Log in"
                    colorPalette="primary"
                    onClick={() => undefined}
                    className="justify-center m-0"
                    type="submit"
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
