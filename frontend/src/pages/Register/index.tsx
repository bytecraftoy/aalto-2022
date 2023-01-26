import React from 'react';
import { RegisterForm } from '../../components/RegisterForm';

export const Register = () => {
    return (
        <div className="flex-1 flex justify-center items-center">
            <div className="bg-surface-1 px-[3%] py-10 sm:px-[10%] rounded-xl">
                <RegisterForm />
            </div>
        </div>
    );
};
