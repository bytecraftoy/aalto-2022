import React, { Fragment } from 'react';
import classNames from 'classnames';
import { solidIcon } from '../../utils/icons';
import { Listbox, Transition } from '@headlessui/react';

export interface DropdownProps {
    choice: string;
    setChoice: (s: string) => void;
    choices: string[];
    disabled?: boolean;
    className?: string;
}

/**
 * Text dropdown with a selection
 */
export const Dropdown: React.FC<DropdownProps> = ({
    choice,
    setChoice,
    choices,
    disabled,
    className,
}) => {
    return (
        <Listbox value={choice} onChange={setChoice}>
            <div
                className={classNames(
                    'relative z-20 transition-all',
                    className
                )}
            >
                <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-neutral-99 py-3 pl-3 pr-10 text-left font-medium shadow-md sm:text-sm">
                    <span className="block truncate">{choice}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {solidIcon('ChevronDownIcon')}
                    </span>
                </Listbox.Button>
                {!disabled && (
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-lg bg-neutral-99 py-0 text-base shadow-lg sm:text-sm">
                            {choices.map((c, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        classNames(
                                            'relative cursor-pointer select-none py-2 pl-10 pr-4',
                                            {
                                                'bg-primary-90 text-primary-20':
                                                    active,
                                            },
                                            { 'text-neutral-20': !active }
                                        )
                                    }
                                    value={c}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={classNames(
                                                    'block truncate',
                                                    { 'font-medium': selected },
                                                    { 'font-normal': !selected }
                                                )}
                                            >
                                                {c}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                )}
            </div>
        </Listbox>
    );
};
