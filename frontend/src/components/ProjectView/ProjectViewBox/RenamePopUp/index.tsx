import React from 'react';
import { useState } from 'react';
import { Popup } from '../../../Popup';

//Pop-up window used to rename projects

interface RenamePopupProps {
    rename: (s: string) => Promise<void>;
    setPopup: (b: boolean) => void;
    popupOpen: boolean;
}

export const RenamePopup: React.FC<RenamePopupProps> = ({
    rename,
    setPopup,
    popupOpen,
}) => {
    const [textInput, setText] = useState<string>('');

    const renameProject = (input: string) => {
        rename(input);
        setPopup(false);
    };

    return (
        <Popup
            title="Rename Project"
            icon="CubeIcon"
            open={popupOpen}
            setOpen={setPopup}
            onConfirm={() => renameProject(textInput)}
            onClose={() => setText('')}
        >
            <div className="h-full w-full flex flex-col justify-between px-4 py-4">
                <input
                    className="px-4 py-2 rounded bg-neutral-10 bg-opacity-8"
                    value={textInput}
                    onInput={({ target }) => {
                        setText((target as HTMLTextAreaElement).value);
                    }}
                />
            </div>
        </Popup>
    );
};
