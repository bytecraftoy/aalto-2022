import { useState, useRef, useEffect } from 'react';
import { EventBus } from '../../../../../utils/eventBus';
import { solidIcon } from '../../../../../utils/icons';

/**
 * Menu that open when clicking user account icon in navigation bar
 * Contains log out from the application
 */

export const UserDropDown = () => {
    const [open, setOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

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
        <div className="relative w-36">
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
                <div className="py-2 bg-surface-2 rounded">
                    <div className=" h-12 w-full">
                        <div
                            className="w-full h-full px-3 flex flex-row gap-1 justify-start items-center bg-neutral-10 bg-opacity-0 hover:bg-opacity-5 active:bg-opacity-8 text-lg"
                            onClick={logout}
                        >
                            {solidIcon('LogoutIcon')}
                            Log out
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
