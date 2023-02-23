import React from 'react';
import { solidIcon } from '../../utils/icons';
import { Disclosure } from '@headlessui/react';

/**
 * Paragraph that can be expanded by the user.
 * Used to present text content more compactly on a page
 */

export interface ExpandableParagraphProps {
    title: string;
    text: string;
}

export const ExpandableParagraph: React.FC<ExpandableParagraphProps> = ({
    title,
    text,
}) => {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-lg font-bold">
                        <span>{title}</span>
                        {solidIcon(open ? 'ChevronUpIcon' : 'ChevronDownIcon')}
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-md">
                        {text}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};
