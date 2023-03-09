/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Header } from './Header';
import { Surface } from '../Surface';
import { useValidation, useLogin, useTimedOpen } from '../../utils/hooks';
import { EventBus } from '../../utils/eventBus';
import { CustomInput } from '../Inputs';
import { FilledButton } from '../Buttons';
import { passwordSchema } from './validation';
import { useRepeatPassword } from '../RegisterForm/hooks';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../Notification';
import { Divider } from '../Divider';
import { changePassword } from './../../utils/changePassword';

/**
 *  Form for registering the user
 */
export const ChangePasswordForm = () => {
    // Dynamic values
    const {
        value: password,
        errors: passwordErrors,
        setValue: setPassword,
    } = useValidation(passwordSchema);
    const {
        value: newPassword,
        errors: newPasswordErrors,
        setValue: setNewPassword,
    } = useValidation(passwordSchema);
    const { repeatedPassword, repeatErrors, changeRepeated } =
        useRepeatPassword(newPassword);

    // Open the notification
    const { open, setOpen } = useTimedOpen(7000);
    const [error, setError] = useState('');

    // Login once the user is registered
    const login = useLogin();

    // Navigation
    const navigate = useNavigate();

    // Disabled the submit button
    const disabled =
        newPasswordErrors !== '' ||
        passwordErrors !== '' ||
        repeatErrors !== '';

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await changePassword(password, newPassword);
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
                    value={password}
                    label="Password"
                    type="password"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                    textHelper="Type your current password"
                    errors={passwordErrors}
                />
                <CustomInput
                    value={newPassword}
                    label="New password"
                    type="password"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewPassword(e.target.value)
                    }
                    textHelper="Choose your new password"
                    errors={newPasswordErrors}
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
                    name="Change password"
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
