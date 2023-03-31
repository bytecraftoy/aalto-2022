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
    const [numberInput, setNumber] = useState<string>('1');

    // Adds multiple I/O boxes
    const addBoxes = (input: string) => {
        const n: number = Number.parseInt(input);
        if (n >= 1 && n <= 100) {
            addPromptBoxes(n);
            return true;
        } else return false;
    };

    return (
        <Popup
            title="Add multiple boxes"
            icon="CubeIcon"
            open={popupOpen}
            setOpen={setPopup}
            onConfirm={() => addBoxes(numberInput)}
            onCancel={() => setNumber('1')}
        >
            <div className="h-full w-full flex flex-col justify-between px-4 py-4">
                <div className="px-2 py-2">Number of boxes (1-100)</div>
                <input
                    className="px-4 py-2 rounded bg-neutral-10 bg-opacity-8"
                    type="number"
                    placeholder="1"
                    min="1"
                    max="100"
                    value={numberInput}
                    onBeforeInput={(e) => {
                        const d = (e.nativeEvent as KeyboardEvent).key;
                        if (
                            typeof d === 'string' &&
                            Number.parseInt(d).toString() !== d
                        )
                            e.preventDefault();
                    }}
                    onInput={(e) => {
                        const t = e.target as HTMLInputElement;
                        setNumber(t.value);
                    }}
                />
            </div>
        </Popup>
    );
};
