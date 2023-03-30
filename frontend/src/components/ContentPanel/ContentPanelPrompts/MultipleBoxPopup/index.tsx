import React from 'react';
import { useState } from 'react';
import { Popup } from '../../../Popup';

//Pop-up window used to add n IO boxes

interface MultipleBoxPopupProps {
    addPromptBoxes: (n: number) => void;
    setPopup: (b: boolean) => void;
    popupOpen: boolean;
}

export const MultipleBoxPopup: React.FC<MultipleBoxPopupProps> = ({
    addPromptBoxes,
    setPopup,
    popupOpen,
}) => {
    const [numberInput, setNumber] = useState<string>('');

    // Adds multiple I/O boxes
    const addBoxes = (input: string) => {
        const n: number = +input;
        if (n > 0 && n < 101) {
            addPromptBoxes(n);
            setPopup(false);
        }
    };

    return (
        <Popup
            title="Add multiple boxes"
            icon="CubeIcon"
            open={popupOpen}
            setOpen={setPopup}
            onConfirm={() => addBoxes(numberInput)}
            onCancel={() => setNumber('')}
        >
            <div className="h-full w-full flex flex-col justify-between px-4 py-4">
                <div className="px-2 py-2">Number of boxes (1-100)</div>
                <input
                    className="px-4 py-2 rounded bg-neutral-10 bg-opacity-8"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={numberInput}
                    onInput={({ target }) => {
                        setNumber((target as HTMLTextAreaElement).value);
                    }}
                />
            </div>
        </Popup>
    );
};
