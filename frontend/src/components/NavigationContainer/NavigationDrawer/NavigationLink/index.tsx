import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Links in navigation drawer to navigate to another page
 *
 */

interface NavigationLinkProps {
    label: string;
    icon: JSX.Element;
    to: string;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
    label,
    icon,
    to
}) => {
    return (
        <Link to={to}>
            <div
                className="
                w-full h-14 rounded-full hover:bg-secondary-90 transition-all  
            "
            >
                <div className="flex py-4 pl-4 pr-5 gap-3">
                    {icon}
                    {label}
                </div>
            </div>
        </Link>
    );
};
