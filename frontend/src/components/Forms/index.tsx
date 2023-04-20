import React from 'react';
import { FilledButton } from '../Buttons';
import { Surface } from '../Surface';
import { Divider } from '../Divider';

export { LoginForm } from './LoginForm';
export { RegisterForm } from './RegisterForm';
export { ChangePasswordForm } from './ChangePasswordForm';

export interface TemplateFormProps {
    header: JSX.Element;
    children: JSX.Element[];
    submitText: string;
    submitDisabled: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

/**
 *  Template for other forms
 */
export const TemplateForm: React.FC<TemplateFormProps> = ({
    header,
    children,
    submitText,
    submitDisabled,
    onSubmit,
}) => {
    return (
        <Surface
            level={2}
            className="max-w-[440px] w-full py-12 px-8 max-sm:w-[90%]"
        >
            <form
                className="flex flex-col items-center gap-10"
                onSubmit={onSubmit}
            >
                {header}

                <Divider />

                {children}

                <FilledButton
                    name={submitText}
                    colorPalette="primary"
                    onClick={() => undefined}
                    className="justify-center"
                    type="submit"
                    disabled={submitDisabled}
                />
            </form>
        </Surface>
    );
};
