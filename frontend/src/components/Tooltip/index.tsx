import React from 'react';
import { useState } from 'react';
import { bg, bgActive, bgHover, textOnBg } from '../../utils/colors';
import { solidIcon } from '../../utils/icons';
import classNames from 'classnames/dedupe';

interface TooltipProps {
    text: string;
    visible: boolean
}

export const Tooltip: React.FC<TooltipProps> = ({
    text,
    visible,
    }) => {

    const [show, SetShow] = useState(false);
    const [pos, SetPos] = useState([0.0, 0.0])
    visible = show

    if (!visible) return (
        <div className='position: absolute left-0 top-0 w-full h-full'
        onMouseEnter={() =>
            SetShow(true)
        }
        onMouseLeave={() =>
            SetShow(false)
        }
    >
    </div>
    )
    ;
    return (
        <div className='position: absolute left-0 top-0 w-full h-full'
            onMouseEnter={() =>
                SetShow(true)
            }
            onMouseLeave={() =>
                SetShow(false)
            }
            onMouseMove={(event) =>
                SetPos([event.clientX, event.clientY])
            }
        >
            <div
            style={{
                position:'fixed',
                left: pos[0],
                top: pos[1]
                }}
            className={classNames(
            'content-fit',
            'bg-neutral-70 rounded-lg',
            )}
            >
                <div className={classNames(
                'text-white text-sm max-w-sm opacity-50',
                'transition-colors duration-1000 delay-1000'
                )}
                >{`Hi! this is a work in progress tooltip box. The mouse position is X: ${pos[0]} and Y: ${pos[1]}`}</div>
            </div>
        </div>
    );
};
