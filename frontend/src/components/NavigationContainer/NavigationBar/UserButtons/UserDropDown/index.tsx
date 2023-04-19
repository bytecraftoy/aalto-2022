import { EventBus } from '../../../../../utils/eventBus';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../utils/hooks';
import { DropdownMenu } from '../../../../DropdownMenu';

/**
 * Menu that open when clicking user account icon in navigation bar
 * Contains log out from the application
 */

export const UserDropDown = () => {
    // Username of the user
    const username = useAppSelector((state) => state.user.info?.username);
    // Navigation
    const navigate = useNavigate();

    // Log out the user
    const logout = async () => {
        EventBus.dispatch('logout', 'logging out');
    };

    return (
        <div className="px-5">
            <DropdownMenu
                icon="UserCircleIcon"
                className="p-3 hover:bg-primary-80"
                iconClassName="w-8 h-8"
                items={[
                    { name: username ?? '', icon: 'IdentificationIcon' },
                    {
                        name: 'Projects',
                        icon: 'WindowIcon',
                        action: () => navigate('/projects'),
                    },
                    {
                        name: 'Settings',
                        icon: 'SettingsIcon',
                        action: () => navigate('/settings'),
                    },
                    {
                        name: 'Logout',
                        icon: 'LogoutIcon',
                        color: 'red',
                        action: logout,
                    },
                ]}
            />
        </div>
    );
};
