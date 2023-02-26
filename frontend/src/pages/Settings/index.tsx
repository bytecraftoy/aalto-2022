import React from 'react';
import { ChangePasswordForm } from '../../components/ChangePasswordForm';

export const Settings = () => {
    return (
        <div className="flex-1 flex justify-center items-center">
            <div className="bg-surface-1 px-[3%] py-10 sm:px-[10%] rounded-xl">
                <ChangePasswordForm />
            </div>
        </div>
    );
};
