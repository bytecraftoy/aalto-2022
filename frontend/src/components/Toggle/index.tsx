import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Icon, solidIcon } from '../../utils/icons';
import { Palette, bg, bgContainer, textOnContainer } from '../../utils/colors';
import { Switch } from '@headlessui/react';

export interface ToggleProps {
    enabled: boolean;
    setEnabled: (b: boolean) => void;
    colorPalette: Palette;
    icon?: Icon;
    className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
    enabled,
    setEnabled,
    colorPalette,
    icon,
    className,
}) => {
    return (
        <Switch checked={enabled} onChange={setEnabled} as={Fragment}>
            {({ checked }) => (
                /* Use the `checked` state to conditionally style the button. */
                <button
                    className={classNames(
                        'relative inline-flex h-6 w-11 items-center rounded-full',
                        enabled && bg(colorPalette),
                        !enabled && bgContainer(colorPalette),
                        className
                    )}
                >
                    <span
                        className={classNames(
                            'inline-block h-4 w-4 transform rounded-full bg-neutral-95 transition',
                            checked ? 'translate-x-6' : 'translate-x-1'
                        )}
                    >
                        {solidIcon(icon, textOnContainer(colorPalette))}
                    </span>
                </button>
            )}
        </Switch>
    );
};
