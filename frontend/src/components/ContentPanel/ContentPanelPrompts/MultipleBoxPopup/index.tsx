import React from 'react';
import { useState } from 'react';
import { Popup } from '../../../Popup';
import { CustomInput } from '../../../Inputs';

//Pop-up window used to add n IO boxes

interface MultipleBoxPopupProps {
    addPromptBoxes: (n: number, input: string) => void;
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
    const [boxInput, setBoxInput] = useState<string>('');

    const min = 1;
    const max = 100;

    // Adds multiple I/O boxes. return true to keep popup open if the input was invalid
    const addBoxes = (nInput: string, input: string) => {
        const n: number = Number.parseInt(nInput);
        if (n >= min && n <= max) {
            addPromptBoxes(n, input);
            return false;
        } else return true;
    };

    return (
        <Popup
            title="Add multiple boxes"
            icon="CubeIcon"
            open={popupOpen}
            setOpen={setPopup}
            onConfirm={() => addBoxes(numberInput, boxInput)}
            onClose={() => {
                setNumber('1');
                setBoxInput('');
            }}
        >
            <div className="h-full w-full flex flex-col justify-between items-center px-4 py-4 gap-2">
                <p className="text-lg">Add boxes (1-100)</p>
                <CustomInput
                    label="Number of boxes"
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
                <p className="text-lg mt-8">Input to fill the boxes</p>
                <CustomInput
                    label="Box input"
                    value={boxInput}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setBoxInput(e.target.value)
                    }
                />
                <p className="text-base">(optional)</p>
            </div>
        </Popup>
    );
};
