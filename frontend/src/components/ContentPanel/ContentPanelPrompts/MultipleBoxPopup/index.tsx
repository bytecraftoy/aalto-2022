import React from 'react';
import { useState } from 'react';
import { Popup } from '../../../Popup';

//Pop-up window used to add n IO boxes

interface MultipleBoxPopupProps {
    addPromptBoxes: (n: number) => void;
    setPopup: (b: boolean) => void;
    popupOpen: boolean;
}

const isNumeric = (text: string): boolean => /^\d*$/.test(text);

export const MultipleBoxPopup: React.FC<MultipleBoxPopupProps> = ({
    addPromptBoxes,
    setPopup,
    popupOpen,
}) => {
    const [numberInput, setNumber] = useState<string>('1');

    const min = 1;
    const max = 100;

    // Adds multiple I/O boxes. return true to keep popup open if the input was invalid
    const addBoxes = (input: string) => {
        const n: number = Number.parseInt(input);
        if (n >= min && n <= max) {
            addPromptBoxes(n);
            return false;
        } else return true;
    };

    return (
        <Popup
            title="Add multiple boxes"
            icon="CubeIcon"
            open={popupOpen}
            setOpen={setPopup}
            onConfirm={() => addBoxes(numberInput)}
            onClose={() => setNumber('1')}
        >
            <div className="h-full w-full flex flex-col justify-between px-4 py-4">
                <div className="px-2 py-2">Number of boxes (1-100)</div>
                <input
                    className="px-4 py-2 rounded bg-neutral-10 bg-opacity-8"
                    type="text"
                    value={numberInput}
                    onInput={(e) => {
                        const value = (e.target as HTMLInputElement).value;
                        const data = (e.nativeEvent as InputEvent).data;
                        const isValid =
                            isNumeric(value) &&
                            (data === null || isNumeric(data));
                        if (isValid) setNumber(value);
                    }}
                />
            </div>
        </Popup>
    );
};
