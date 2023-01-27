import React from 'react';
import { Header } from './Header';
import { useValue } from '../../utils/hooks';
import { CustomInput } from '../Inputs';
import { FilledButton } from '../Buttons';
import { usernameSchema, passwordSchema } from './validation';
import { useRepeatPassword } from './hooks';

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

    // Disabled the submit button
    const disabled =
        usernameErrors !== '' || passwordErrors !== '' || repeatErrors !== '';

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <form className="flex flex-col w-72 gap-10" onSubmit={submitForm}>
            <Header />

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
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                }
                textHelper="Choose your password"
                errors={passwordErrors}
            />
            <CustomInput
                value={repeatedPassword}
                label="Repeat password"
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
