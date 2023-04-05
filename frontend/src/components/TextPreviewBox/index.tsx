import React from 'react';
import classNames from 'classnames';
import { Tooltip } from '../Tooltip';

/**
 * Floating action button, i.e., floating icon button
 * More info about the component here:
 * https://m3.material.io/components/extended-fab/overview
 */

interface TextPreviewProps {
    inputFieldText: string;
}

export const TextPreview: React.FC<TextPreviewProps> = ({ inputFieldText }) => {
    const makePreview = () => {
        return inputFieldText.slice(0, 130) + '...';
    };

    return (
        <Tooltip text={inputFieldText} icon={'ArrowPathIcon'}>
            <div
                className={classNames(
                    'm-4 h-24 rounded-xl w-full w-[380px] flex flex-row justify-center items-center bg-neutral-90 border-white border-2'
                )}
            >
                <p className="pl-4 pr-4 overflow-hidden text-ellipsis max-h-24 text-neutral-40">
                    {makePreview()}
                </p>
            </div>
        </Tooltip>
    );
};
