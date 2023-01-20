import classNames from 'classnames';
import {
    PlusIcon,
    Bars3Icon,
    UserCircleIcon,
    InformationCircleIcon,
    Cog6ToothIcon,
    CubeIcon,
    WindowIcon,
    XMarkIcon,
    ArrowPathIcon,
    LockClosedIcon,
    LockOpenIcon,
} from '@heroicons/react/24/solid';

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
    | 'LockOpenIcon';

/** Default sized Icon element using HeroIcons */
export const solidIcon = (i?: Icon, className?: string) => {
    const classN = classNames('w-6 h-6', className);
    switch (i) {
        case 'PlusIcon':
            return <PlusIcon className={classN} />;
        case 'Bars3Icon':
            return <Bars3Icon className={classN} />;
        case 'UserCircleIcon':
            return <UserCircleIcon className={classN} />;
        case 'InformationCircleIcon':
            return <InformationCircleIcon className={classN} />;
        case 'SettingsIcon':
            return <Cog6ToothIcon className={classN} />;
        case 'CubeIcon':
            return <CubeIcon className={classN} />;
        case 'WindowIcon':
            return <WindowIcon className={classN} />;
        case 'XMarkIcon':
            return <XMarkIcon className={classN} />;
        case 'ArrowPathIcon':
            return <ArrowPathIcon className={classN} />;
        case 'LockClosedIcon':
            return <LockClosedIcon className={classN} />;
        case 'LockOpenIcon':
            return <LockOpenIcon className={classN} />;
        default:
            return <></>;
    }
};
