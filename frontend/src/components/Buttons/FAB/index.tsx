import React from 'react';
import { Icon } from '../../Icon';
import classNames from 'classnames';

/**
 * Floating action button, i.e., floating icon button
 * More info about the component here:
 * https://m3.material.io/components/floating-action-button/overview
 */

interface FABProps {
    icon: string;
    size?: 'large' | 'small';
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const FAB: React.FC<FABProps> = ({ icon, size, onClick }) => {
    return (
        <div className="inline-block p-4 ">
            {/* Three different FABs: FAB, small FAB, large FAB */}
            <button onClick={onClick}>
                {/* Color layer */}
                <div
                    className={classNames(
                        'bg-primary-90 shadow-lg',
                        { 'w-24 h-24 rounded-[28px]': size === 'large' },
                        { 'w-10 h-10 rounded-xl': size === 'small' },
                        { 'w-14 h-14 rounded-2xl': !size }
                    )}
                >
                    {/* State layer */}
                    <div
                        className={classNames(
                            'w-full h-full flex items-center bg-onSecondaryContainer bg-opacity-0 hover:bg-opacity-8 active:bg-opacity-12',
                            { 'rounded-[28px]': size === 'large' },
                            { 'rounded-xl': size === 'small' },
                            { 'rounded-2xl': !size }
                        )}
                    >
                        {/* Large FAB */}
                        {size === 'large' && (
                            <Icon
                                icon={icon}
                                width={36}
                                height={36}
                                color="#110563"
                            />
                        )}

                        {/* Small FAB */}
                        {size === 'small' && (
                            <Icon icon={icon} color="#110563" />
                        )}

                        {/* Default FAB */}
                        {!size && <Icon icon={icon} color="#110563" />}
                    </div>
                </div>
            </button>
        </div>
    );
};
