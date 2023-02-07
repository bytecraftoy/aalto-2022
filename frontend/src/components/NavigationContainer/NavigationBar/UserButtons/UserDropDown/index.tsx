import { useState, useRef, useEffect } from 'react';
import { EventBus } from '../../../../../utils/eventBus';
import { solidIcon } from '../../../../../utils/icons';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../utils/hooks';
import { UserDropDownItem } from './UserDropDownItem';

/**
 * Menu that open when clicking user account icon in navigation bar
 * Contains log out from the application
 */

export const UserDropDown = () => {
    // Username of the user
    const username = useAppSelector((state) => state.user.info?.username);
    // Navigation
    const navigate = useNavigate();
    // If the drawer is open
    const [open, setOpen] = useState(false);
    // Refs for the drawer and the button
    const drawerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Closes the drawer if clicked outside of the drawer
    useEffect(() => {
        // Closes the drawer if clicked outside of the drawer
        const close = (e: MouseEvent) => {
            if (
                !drawerRef.current?.contains(e.target as Node) &&
                !buttonRef.current?.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        // Add new event listener
        document.addEventListener('mousedown', close);

        return () => {
            document.removeEventListener('mousedown', close);
        };
    }, []);

    // Log out the user
    const logout = async () => {
        EventBus.dispatch('logout', 'logging out');
    };

    return (
        <div className="relative w-60">
            <div className="flex justify-end w-full">
                <button ref={buttonRef} onClick={() => setOpen(!open)}>
                    {solidIcon(
                        'UserCircleIcon',
                        'mx-8 w-8 h-8 text-primary-30'
                    )}
                </button>
            </div>

            <div
                ref={drawerRef}
                className={`absolute left-0 bot-0 z-40 pt-2 pr-3 w-full ${
                    open ? 'visible' : 'invisible'
                }`}
            >
                {/** Container */}
                <div className="flex flex-col py-2 bg-surface-2 rounded">
                    {/** User name */}
                    <div className="h-10 w-full">
                        <div className="w-full h-full px-3 text-lg flex items-center">
                            {username}
                        </div>
                    </div>

                    {/** Divider */}
                    <div className="py-3 px-2">
                        <div className="h-px w-full bg-neutral-10"></div>
                    </div>

                    {/** Actions */}
                    <div className="flex flex-col gap-2 cursor-default">
                        {/** Settings */}
                        <UserDropDownItem
                            onClick={() => navigate('/settings')}
                            icon="SettingsIcon"
                            name="Settings"
                        />

                        {/** Logout */}
                        <UserDropDownItem
                            onClick={logout}
                            icon="LogoutIcon"
                            name="Logout"
                            red
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
