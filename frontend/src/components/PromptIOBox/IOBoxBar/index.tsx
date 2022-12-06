import React from 'react';
import { IOBoxButton } from './IOBoxButton';

interface IOBoxBarProps {
    showButtons: boolean;
    locked: boolean;
    generate: () => void;
    deleteSelf: (() => void) | null; //null --> don't show button
    lock: () => void;
}

export const IOBoxBar: React.FC<IOBoxBarProps> = ({
    showButtons,
    locked,
    generate,
    deleteSelf,
    lock,
}) => {
    return (
        <div className="absolute flex flex-row">
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
                />
            ) : (
                <></>
            )}
        </div>
    );
};
