import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-3xl text-center">
                Create account
            </h1>
            <div className="flex flex-row gap-2 text-center">
                Already have an account?
                <div className="text-primary underline">
                    <Link to="/login">Log in</Link>
                </div>
            </div>
        </div>
    );
};
