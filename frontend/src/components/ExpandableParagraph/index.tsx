import React from 'react';
import { solidIcon } from '../../utils/icons';
import { Disclosure } from '@headlessui/react';

/**
 * Paragraph that can be expanded by the user.
 * Used to present text content more compactly on a page
 */

export interface ExpandableParagraphProps {
    title: string;
    children: JSX.Element;
}

export const ExpandableParagraph: React.FC<ExpandableParagraphProps> = ({
    title,
    children,
}) => {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex flex-row items-center w-full rounded-2xl px-2 py-4 text-left text-lg font-bold transition-all hover:bg-primary-90/80">
                        <span className="font-medium text-neutral-20 text-xl pr-4">
                            {title}
                        </span>
                        {solidIcon(open ? 'ChevronUpIcon' : 'ChevronDownIcon')}
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-4 text-lg leading-relaxed">
                        {children}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};
