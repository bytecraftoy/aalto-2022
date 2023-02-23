import React from 'react';
import { useAppSelector, useLoginRedirect } from './../../utils/hooks';
import { AboutPage } from '../../components/AboutPage';

export const About = () => {
    // Redirect anonymous users from this page to the login page
    useLoginRedirect();

    return (
        <div className="App bg-neutral-99 flex-1 flex flex-col justify-start items-center">
            <AboutPage />
        </div>
    );
};
