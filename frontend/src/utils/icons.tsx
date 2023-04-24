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
    | 'ChevronDownIcon'
    | 'ExclamationTriangleIcon'
    | 'ArrowLeftIcon'
    | 'ArrowRightIcon'
    | 'AdjustmentsHorizontalIcon'
    | 'PencilIcon'
    | 'IdentificationIcon'
    | 'DocumentCheckIcon'
    | 'DocumentPlusIcon'
    | 'DocumentDuplicateIcon'
    | 'ArrowsUpDownIcon'
    | 'MinusCircleIcon'
    | 'TrashIcon';

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
        case 'ExclamationTriangleIcon':
            return <I.ExclamationTriangleIcon className={classN} />;
        case 'ArrowLeftIcon':
            return <I.ArrowLeftIcon className={classN} />;
        case 'ArrowRightIcon':
            return <I.ArrowRightIcon className={classN} />;
        case 'AdjustmentsHorizontalIcon':
            return <I.AdjustmentsHorizontalIcon className={classN} />;
        case 'PencilIcon':
            return <I.PencilIcon className={classN} />;
        case 'IdentificationIcon':
            return <I.IdentificationIcon className={classN} />;
        case 'DocumentCheckIcon':
            return <I.DocumentCheckIcon className={classN} />;
        case 'DocumentPlusIcon':
            return <I.DocumentPlusIcon className={classN} />;
        case 'DocumentDuplicateIcon':
            return <I.DocumentDuplicateIcon className={classN} />;
        case 'ArrowsUpDownIcon':
            return <I.ArrowsUpDownIcon className={classN} />;
        case 'MinusCircleIcon':
            return <I.MinusCircleIcon className={classN} />;
        case 'TrashIcon':
            return <I.TrashIcon className={classN} />;
        default:
            return <></>;
    }
};
