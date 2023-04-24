import React from 'react';
import { Popup } from '../../../Popup';

interface ClearBoxesPopupProps {
    open: boolean;
    setOpen: (b: boolean) => void;
    clear: () => void;
}

export const ClearBoxesPopup: React.FC<ClearBoxesPopupProps> = ({
    open,
    setOpen,
    clear,
}) => {
    return (
        <Popup
            title="Clear inputs"
            icon="ExclamationTriangleIcon"
            open={open}
            setOpen={setOpen}
            onConfirm={() => {
                clear();
                return false; // Do not keep popup open
            }}
        >
            <div className="p-4">
                <p className="text-lg">
                    This action will clear all non-locked inputs and outputs
                    from this panel.
                </p>
                <p className="text-lg">Are you sure you?</p>
            </div>
        </Popup>
    );
};

/*



*/
