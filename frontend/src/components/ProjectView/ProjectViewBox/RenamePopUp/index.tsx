import React, { useRef } from 'react';
import { useState } from 'react';
import { Popup } from '../../../Popup';
import { CustomInput } from '../../../Inputs';

//Pop-up window used to rename projects

interface RenamePopupProps {
    rename: (s: string) => Promise<void>;
    setPopup: (b: boolean) => void;
    popupOpen: boolean;
    dataID?: string;
}

export const RenamePopup: React.FC<RenamePopupProps> = ({
    rename,
    setPopup,
    popupOpen,
    dataID,
}) => {
    const [textInput, setText] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const renameProject = (input: string) => {
        const valid = input.trim().length;
        if (valid) rename(input);
        return !valid;
    };

    return (
        <Popup
            title="Rename Project"
            icon="CubeIcon"
            open={popupOpen}
            setOpen={setPopup}
            onConfirm={() => renameProject(textInput)}
            onClose={() => setText('')}
            onOpen={() => setTimeout(() => inputRef.current?.focus(), 200)}
        >
            <div
                data-testid={dataID}
                className="h-full w-full flex flex-col justify-between items-center px-4 py-4 gap-6"
            >
                <p className="text-lg">
                    What would you like to call this project?
                </p>
                <CustomInput
                    inputRef={inputRef}
                    label="New name for the project"
                    value={textInput}
                    onInput={({ target }) => {
                        setText((target as HTMLTextAreaElement).value);
                    }}
                />
            </div>
        </Popup>
    );
};
