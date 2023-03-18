import React, { useEffect } from 'react';
import { useLogin, useLogout } from '../../utils/hooks';
import { EventBus } from '../../utils/eventBus';
import { backendURL } from '../../utils/backendURL';
import { Account } from '../../utils/types';
import { useNavigate } from 'react-router-dom';

interface ContainerProps {
    children: React.ReactNode;
}

/**
 * Wrapped component for logging the user out of the application.
 */
export const UserContainer: React.FC<ContainerProps> = ({ children }) => {
    const login = useLogin();
    const logout = useLogout();
    const navigate = useNavigate();

    // Function for log out, i.e., emptying the cookies.
    async function onCustomEvent() {
        // Empty cookies
        await fetch(`${backendURL}/api/user/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        // Cause a logout on the frontend
        await logout();
        navigate('/login');
    }

    // Logs in after refresh
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${backendURL}/api/user`, {
                method: 'GET',
                credentials: 'include',
            });

            if (res.status === 200) {
                const body = await res.json();

                const acc: Account = {
                    username: body.name,
                    id: body.id,
                };

                // Initiate a login for this account
                await login(acc);
            }
        };

        fetchData();
    }, []);

    // Adds event listener for logout events and logouts user when the event is fired
    useEffect(() => {
        EventBus.on('logout', onCustomEvent);

        return () => {
            EventBus.remove('logout', onCustomEvent);
        };
    }, []);

    return <>{children}</>;
};
