import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-3xl text-center">
                Create account
            </h1>
            <div className="flex flex-row gap-2">
                ALREADY HAVE AN ACCOUNT?
                <div className="text-primary underline">
                    <Link to="/login">LOG IN</Link>
                </div>
            </div>
        </div>
    );
};
