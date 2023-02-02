import { TextButton } from '../../../Buttons';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../utils/hooks';
import { UserDropDown } from './UserDropDown';

/**
 * Right side action buttons in top app bar.
 */

export const UserButtons = () => {
    const loggedIn = useAppSelector((state) => state.user.logged);

    // For navigation
    const navigate = useNavigate();

    if (!loggedIn) {
        return (
            <div className="flex flex-row">
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
            </div>
        );
    }

    return (
        <div className="flex flex-row">
            <UserDropDown />
        </div>
    );
};
