import React from 'react';
import { IOBoxButton } from './IOBoxButton';

/**
 * Compoennt containing all the actions of the Input/Output boxes
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
        <div className="absolute top-10 flex flex-row z-1">
            {deleteSelf ? (
                <IOBoxButton
                    onClick={() => deleteSelf?.()}
                    name="Delete"
                    colorPalette="red"
                    visible={showButtons}
                />
            ) : (
                <></>
            )}
            <IOBoxButton
                onClick={lock}
                name={locked ? 'Unlock' : 'Lock'}
                colorPalette={locked ? 'tertiary' : 'secondary'}
                visible={locked || showButtons}
            />
            {!locked ? (
                <IOBoxButton
                    onClick={generate}
                    name="Generate"
                    colorPalette="primary"
                    visible={showButtons}
                    errors={errors}
                />
            ) : (
                <></>
            )}
        </div>
    );
};
