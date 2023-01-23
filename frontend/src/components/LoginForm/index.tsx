import React from 'react';
import { CustomInput } from '../Inputs';
import { FilledButton, TextButton } from '../Buttons';
import { useNavigate } from 'react-router-dom';
import { useValue } from '../../utils/hooks';
<<<<<<< HEAD
import { usernameSchema } from './validation';
=======
import { usernameSchema, passwordSchema } from './validation';
>>>>>>> ee4579cafcfdc3c9dbc20edc8aa6ad016f444f1d
import { Notification } from './Notification';
import { useOpen } from './hooks';

/**
 *
 * Form for log in to the application
 *
 */

export const LoginForm = () => {
    const {
        value: username,
        errors: usernameErrors,
        changeValue: changeUsername,
    } = useValue(usernameSchema);
<<<<<<< HEAD
    const { value: password, changeValue: changePassword } =
        useValue(usernameSchema);
=======
    const {
        value: password,
        errors: passwordErrors,
        changeValue: changePassword,
    } = useValue(passwordSchema);
>>>>>>> ee4579cafcfdc3c9dbc20edc8aa6ad016f444f1d

    // If the error message of the user is shown
    const { open, setOpen } = useOpen();

<<<<<<< HEAD
=======
    // Disables the submit button
    const disabled = usernameErrors !== '' || passwordErrors !== '';

>>>>>>> ee4579cafcfdc3c9dbc20edc8aa6ad016f444f1d
    // Navigation
    const navigate = useNavigate();

    //Submits the login form
    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //TODO API call for the backend to login
        // Now just mock log in
        if (username === 'hello' && password === 'world') {
<<<<<<< HEAD
            console.log('Logged in!');
=======
            navigate('/');
>>>>>>> ee4579cafcfdc3c9dbc20edc8aa6ad016f444f1d
        } else {
            setOpen(true);
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
            <Notification isOpen={open} close={() => setOpen(false)} />
            <CustomInput
                type="text"
                label="Username*"
                textHelper="Please enter your username"
                value={username}
                onInput={changeUsername}
                errors={usernameErrors}
            />
            <CustomInput
                type="password"
                label="Password*"
                textHelper="Please enter your password"
                value={password}
                onInput={changePassword}
<<<<<<< HEAD
=======
                errors={passwordErrors}
>>>>>>> ee4579cafcfdc3c9dbc20edc8aa6ad016f444f1d
            />
            <div className="flex flex-col gap-2">
                <FilledButton
                    name="Log in"
                    colorPalette="primary"
                    onClick={() => undefined}
                    className="justify-center"
                    type="submit"
<<<<<<< HEAD
=======
                    disabled={disabled}
>>>>>>> ee4579cafcfdc3c9dbc20edc8aa6ad016f444f1d
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
