import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-3xl text-center">Log in</h1>
            <div className="flex flex-row gap-2 text-center">
                <div className="text-primary underline hover:text-primary-70">
                    <Link to="/register">Click here to register</Link>
                </div>
            </div>
        </div>
    );
};
