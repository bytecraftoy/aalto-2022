import React from 'react';
import { Popup } from '../../../Popup';

interface DeletePopupProps {
    open: boolean;
    setOpen: (b: boolean) => void;
    del: () => void;
    dataID?: string;
}

export const DeletePopup: React.FC<DeletePopupProps> = ({
    open,
    setOpen,
    del,
    dataID,
}) => {
    return (
        <Popup
            title="Delete project"
            icon="ExclamationTriangleIcon"
            open={open}
            setOpen={setOpen}
            onConfirm={() => {
                del();
                return false; // Do not keep popup open
            }}
        >
            <div data-testid={dataID} className="p-4">
                <p className="text-lg">
                    This will delete the project and all data in it. This action
                    cannot be undone.
                </p>
                <p className="text-lg">Are you sure?</p>
            </div>
        </Popup>
    );
};

/*



*/
