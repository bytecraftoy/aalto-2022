import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { EventBus } from '../../utils/eventBus';
import { backendURL } from '../../utils/backendURL';
import { logOut, logIn } from '../../reducers/userReducer';
import { getProjects } from '../../utils/projects';
import { setPanels } from '../../reducers/panelReducer';

/**
 * Wrapped component for logging out of the user from the application.
 */

interface ContainerProps {
    children: React.ReactNode;
}

export const UserContainer: React.FC<ContainerProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const panels = useAppSelector((state) => state.panels.value);

    // Function for log out, i.e., emptying the cookies.
    async function onCustomEvent() {
        // Empty cookies
        await fetch(`${backendURL}/api/user/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        // Empty user logged in state from redux store
        dispatch(logOut());
    }

    // Logs in after refresh
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${backendURL}/api/user`, {
                method: 'GET',
                credentials: 'include',
            });

            if (res.status === 200) {
                dispatch(logIn());
                const newPanels = await getProjects(panels);
                console.log(newPanels);
                dispatch(setPanels(newPanels));
            }
        };

        fetchData();
    }, []);

    // Adds event listener for logout events and logouts user when the evne tis fired
    useEffect(() => {
        EventBus.on('logout', onCustomEvent);

        return () => {
            EventBus.remove('logout', onCustomEvent);
        };
    }, []);

    return <>{children}</>;
};
