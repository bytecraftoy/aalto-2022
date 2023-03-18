import React, { useState } from 'react';
import classNames from 'classnames/dedupe';
import { Transition } from '@headlessui/react';
import { Icon, solidIcon } from '../../utils/icons';

interface TooltipProps {
    text: string;
    icon?: Icon;
    children: JSX.Element;
    floatRight?: boolean; // Prefer positioning the tooltip on the right
    disabled?: boolean;
}

/**
 * Component that renders a tooltip when the user hovers over the it.
 * @param children Content that the tooltip is displayed for
 */
export const Tooltip: React.FC<TooltipProps> = ({
    text,
    icon,
    children,
    floatRight,
    disabled,
}) => {
    // Show tooltip if we are hovering the parent container
    const [show, setShow] = useState(false);
    const enabled = show && !disabled;

    // Track mouse position and show the tooltip relative to it
    const [pos, setPos] = useState([0.0, 0.0]);
    const mouseHandler = enabled
        ? (event: React.MouseEvent<HTMLDivElement>) =>
              setPos([event.clientX, event.clientY])
        : undefined;

    return (
        /* Area to track hovering */
        <div
            className="relative"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onMouseMove={mouseHandler}
        >
            {/* Visible tooltip with text */}
            <Transition
                show={enabled}
                enterFrom="opacity-0 delay-[1000ms] duration-200 transition-opacity"
                enterTo="opacity-100 delay-[1000ms] duration-200 transition-opacity"
                leaveFrom="opacity-100 transition-all duration-100"
                leaveTo="opacity-0 transition-all duration-100"
                style={
                    floatRight
                        ? { left: pos[0] + 4 - 200, top: pos[1] + 20 }
                        : { left: pos[0] + 4, top: pos[1] + 20 }
                }
                className={classNames(
                    'z-[999] max-w-[300px] fixed p-2 rounded-xl pointer-events-none select-none',
                    'bg-neutral-70/90 text-neutral-99 text-base',
                    'flex flex-row justify-center items-center'
                )}
            >
                {solidIcon(icon, 'w-6 h-6 mr-2 text-neutral-99')}
                <p className="w-full">{text}</p>
            </Transition>

            {/* Content that the tooltip is intended for */}
            {children}
        </div>
    );
};
