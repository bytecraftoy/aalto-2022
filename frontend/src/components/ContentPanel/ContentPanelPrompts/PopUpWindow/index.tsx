import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import { TextButton } from '../../../Buttons';

//Pop-up window used to add n IO boxes

interface PopUpWindowProps {
    addPromptBoxes: (n: number) => void;
    setPopup: (b: boolean) => void;
    popupOpen: boolean;
}

const isNumeric = (text: string): boolean => /^\d*$/.test(text);

export const PopUpWindow: React.FC<PopUpWindowProps> = ({
    addPromptBoxes,
    setPopup,
    popupOpen,
}) => {
    const [numberInput, setNumber] = useState<string>('');
    const limits = [1, 100];

    // Adds multiple I/O boxes
    const addBoxes = (input: string) => {
        const n: number = Number.parseInt(input);
        if (n >= limits[0] && n <= limits[1]) {
            addPromptBoxes(n);
            setPopup(false);
        }
    };

    return (
        <div
            className={classNames(
                { hidden: !popupOpen },
                'fixed top-0 left-0 w-screen h-screen z-[100]'
            )}
        >
            <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50"></div>
            <div className="fixed top-1/2 left-1/2 w-72 h-52 bg-white -translate-x-1/2 -translate-y-1/2">
                <div className="h-full w-full flex flex-col justify-between px-4 py-4">
                    <div className="px-2 py-2">Add IO boxes (1-100)</div>

                    <input
                        className="px-4 py-2 rounded bg-neutral-10 bg-opacity-8"
                        type="text"
                        min={limits[0]}
                        max={limits[1]}
                        value={numberInput}
                        /*onBeforeInput={(e) => {
                            const d = (e.nativeEvent as KeyboardEvent).key;
                            if (
                                typeof d === 'string' &&
                                Number.parseInt(d).toString() !== d
                            )
                                e.preventDefault();
                        }}*/
                        onInput={(e) => {
                            const value = (e.target as HTMLInputElement).value;
                            const data = (e.nativeEvent as InputEvent).data;
                            const isValid = isNumeric(value) && (data === null || isNumeric(data));
                            console.log(value, data, isValid);
                            if(isValid) setNumber(value);
                        }}
                    />

                    <div className="flex w-full justify-end">
                        <TextButton
                            name="Add"
                            onClick={() => addBoxes(numberInput)}
                            colorPalette="primary"
                        />

                        <TextButton
                            name="Cancel"
                            onClick={() => setPopup(false)}
                            colorPalette="primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
