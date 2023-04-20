/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useValidation, useLogin, useTimedOpen } from '../../../utils/hooks';
import { CustomInput } from '../../Inputs';
import { registerPasswordSchema } from '../validation';
import { useRepeatPassword } from '../hooks';
import { changePassword } from './../../../utils/changePassword';
import { Notification } from '../../Notification';
import { Header } from './Header';
import { TemplateForm } from '..';

/**
 *  Form for changing the user's password
 */
export const ChangePasswordForm = () => {
    // Dynamic values
    const {
        value: password,
        errors: passwordErrors,
        setValue: setPassword,
    } = useValidation(registerPasswordSchema);
    const {
        value: newPassword,
        errors: newPasswordErrors,
        setValue: setNewPassword,
    } = useValidation(registerPasswordSchema);
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

        const result = await changePassword(password, newPassword);
        if (result === 'success') navigate('/');
    };

    return (
        <TemplateForm
            header={<Header />}
            onSubmit={submitForm}
            submitDisabled={disabled}
            submitText="Change password"
        >
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
        </TemplateForm>
    );
};
