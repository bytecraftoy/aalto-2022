/**
 * Named aliases for React components exported by heroicons,
 * and wrapped into a type
 *
 * Heroicons has it's components set up in a way
 * where they are meant to imported and styled per use.
 * For many purposes, it's more useful to have a base icon component
 * that can be swapped with a named constant.
 * Since all heroicons are separate components, we need a mapping from
 * Icon => JSX.Element
 *
 * This file is slightly tedious to maintain
 */

import classNames from 'classnames';
import * as I from '@heroicons/react/24/solid';

/** Type containing predefined constants for common icons */
export type Icon =
    | 'PlusIcon'
    | 'Bars3Icon'
    | 'UserCircleIcon'
    | 'InformationCircleIcon'
    | 'SettingsIcon'
    | 'CubeIcon'
    | 'WindowIcon'
    | 'XMarkIcon'
    | 'ArrowPathIcon'
    | 'LockClosedIcon'
    | 'LockOpenIcon'
    | 'LogoutIcon'
    | 'Cog6Tooth'
    | 'ChevronUpIcon'
    | 'ChevronDownIcon';

/**
 * Default sized solid icon element using HeroIcons.
 *
 * i is allowed to be undefined for conditionally
 * rendering icons (i.e. render an icon if provided)
 */
export const solidIcon = (i?: Icon, className?: string) => {
    // Default styling and custom className
    const classN = classNames('w-6 h-6', className);

    // Match icon name to element
    // Without reflection in typescript, there isn't a
    // much cleaner way to write this
    switch (i) {
        case 'PlusIcon':
            return <I.PlusIcon className={classN} />;
        case 'Bars3Icon':
            return <I.Bars3Icon className={classN} />;
        case 'UserCircleIcon':
            return <I.UserCircleIcon className={classN} />;
        case 'InformationCircleIcon':
            return <I.InformationCircleIcon className={classN} />;
        case 'SettingsIcon':
            return <I.Cog6ToothIcon className={classN} />;
        case 'CubeIcon':
            return <I.CubeIcon className={classN} />;
        case 'WindowIcon':
            return <I.WindowIcon className={classN} />;
        case 'XMarkIcon':
            return <I.XMarkIcon className={classN} />;
        case 'ArrowPathIcon':
            return <I.ArrowPathIcon className={classN} />;
        case 'LockClosedIcon':
            return <I.LockClosedIcon className={classN} />;
        case 'LockOpenIcon':
            return <I.LockOpenIcon className={classN} />;
        case 'LogoutIcon':
            return <I.ArrowLeftOnRectangleIcon className={classN} />;
        case 'Cog6Tooth':
            return <I.Cog6ToothIcon className={classN} />;
        case 'ChevronUpIcon':
            return <I.ChevronUpIcon className={classN} />;
        case 'ChevronDownIcon':
            return <I.ChevronDownIcon className={classN} />;
        default:
            return <></>;
    }
};
