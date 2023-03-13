import React from 'react';
import { IOBoxButton } from './IOBoxButton';

/**
 * Component containing all the actions of the Input/Output boxes
 * e.g., locking, generation, and deleting ioboxes.
 */

interface IOBoxBarProps {
    showButtons: boolean;
    locked: boolean;
    generate: () => void;
    deleteSelf: (() => void) | null; //null --> don't show button
    lock: () => void;
    errors: string;
}

export const IOBoxBar: React.FC<IOBoxBarProps> = ({
    showButtons,
    locked,
    generate,
    deleteSelf,
    lock,
    errors,
}) => {
    return (
        <div className="absolute w-full px-5 flex flex-row justify-end items-center z-1">
            {!locked && !errors ? (
                <IOBoxButton
                    icon="ArrowPathIcon"
                    onClick={generate}
                    name="Generate"
                    colorPalette="primary"
                    visible={showButtons}
                />
            ) : (
                <></>
            )}
            <IOBoxButton
                icon="LockClosedIcon"
                onClick={lock}
                name={locked ? 'Unlock' : 'Lock'}
                colorPalette={locked ? 'secondary' : 'tertiary'}
                visible={locked || showButtons}
            />
            {deleteSelf && !locked ? (
                <IOBoxButton
                    icon="XMarkIcon"
                    onClick={() => deleteSelf?.()}
                    name="Delete"
                    colorPalette="red"
                    visible={showButtons}
                />
            ) : (
                <></>
            )}
        </div>
    );
};
