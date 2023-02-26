import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Icon, solidIcon } from '../../utils/icons';
import { Listbox, Transition } from '@headlessui/react';

export interface DropdownProps {
    choice: string;
    setChoice: (s: string) => void;
    choices: string[];
    disabled?: boolean;
    className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
    choice,
    setChoice,
    choices,
    disabled,
    className,
}) => {
    return (
        <Listbox value={choice} onChange={setChoice}>
            <div className="relative mt-1 z-20">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {choices.map((c, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? 'bg-amber-100 text-amber-900'
                                                : 'text-gray-900'
                                        }`
                                    }
                                    value={c}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? 'font-medium'
                                                        : 'font-normal'
                                                }`}
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
