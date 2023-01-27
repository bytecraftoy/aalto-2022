import React from 'react';
import { Surface } from '../../Surface';
import { solidIcon } from '../../../utils/icons';
import { TextButton } from '../../Buttons';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { EventBus } from '../../../utils/eventBus';

/**
 * Component for elements inside the actual navigation bar
 */

interface NavigationBarProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ setOpen }) => {
    const navigate = useNavigate();

    // Log out the user
    const logout = async () => {
        EventBus.dispatch('logout', 'logging out');
    };

    return (
        <Surface
            level={5}
            className="sticky w-full top-0 left-0 h-20 z-20 flex justify-between items-center outline outline-1 outline-primary-80"
        >
            <button onClick={() => setOpen(true)}>
                {solidIcon('Bars3Icon', 'mx-8 w-8 h-8 text-primary-30')}
            </button>

            {/* Only show title on large screens */}
            <h1 className="text-2xl font-medium mx-4 text-center text-neutral-10 max-lg:hidden">
                AI-assisted game content creator
            </h1>

            {/* User actions, TODO: show log out and user icon conditionally */}
            <div className="flex flex-row">
                <TextButton
                    name="Log out"
                    colorPalette="primary"
                    onClick={logout}
                    className="m-0 max-sm:text-sm"
                />
                <TextButton
                    name="Sign up"
                    colorPalette="primary"
                    onClick={() => navigate('/register')}
                    className="m-0 max-sm:text-sm"
                />
                <TextButton
                    name="Log in"
                    colorPalette="primary"
                    onClick={() => navigate('/login')}
                    className="m-0 max-sm:text-sm"
                />
                <button>
                    {solidIcon(
                        'UserCircleIcon',
                        'mx-8 w-8 h-8 text-primary-30'
                    )}
                </button>
            </div>
        </Surface>
    );
};
