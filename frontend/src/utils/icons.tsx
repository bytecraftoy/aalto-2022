import classNames from 'classnames';
import { PlusIcon, Bars3Icon, UserCircleIcon } from '@heroicons/react/24/solid';
export type Icon = 'PlusIcon' | 'Bars3Icon' | 'UserCircleIcon';
export const solidIcon = (i?: Icon, className?: string) => {
    const classN = classNames('w-6 h-6', className);
    switch (i) {
        case 'PlusIcon':
            return <PlusIcon className={classN} />;
        case 'Bars3Icon':
            return <Bars3Icon className={classN} />;
        case 'UserCircleIcon':
            return <UserCircleIcon className={classN} />;
        default:
            return <></>;
    }
};
