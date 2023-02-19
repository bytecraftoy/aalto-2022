import React from 'react';
import { useLoginRedirect } from './../../utils/hooks';

export const About = () => {
    // Redirect anonymous users from this page to the login page
    useLoginRedirect();

    return (
        <div>
            <h1>ABOUT PAGE</h1>
        </div>
    );
};
