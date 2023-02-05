import React from "react";
import { useState } from "react";
import classNames from "classnames";

//Pop-up window used to add n IO boxes

interface PopUpWindowProps {
    addPromptBoxes: (n: number) => void;
    setPopup: (b: boolean) => void;
    popupOpen: boolean;
}

export const PopUpWindow: React.FC<PopUpWindowProps> = ({
    addPromptBoxes,
    setPopup,
    popupOpen,
}) => {

    const [numberInput, setNumber] = useState<string>("");

    

    // Adds multiple I/O boxes
    const addBoxes = (input:string) => {
        const n: number = +input;
        if(n > 0){
            addPromptBoxes(n);
            setPopup(false);
        }
    };

    return (
        <div className={classNames(
            { hidden: !popupOpen },
            "fixed clip"
        )

        }>
            <div>
            <input
                className="px-4 py-2 rounded hover:bg-neutral-10 hover:bg-opacity-8"
                type="number"
                placeholder="0"
                value={numberInput}
                onInput={({ target }) => {
                    setNumber((target as HTMLTextAreaElement).value);
                }}
    />

        <button
        className="px-4 py-2 rounded hover:bg-neutral-10 hover:bg-opacity-8"
        onClick={() => addBoxes(numberInput)}>
            Add
        </button>
        <button
        className="px-4 py-2 rounded hover:bg-neutral-10 hover:bg-opacity-8"
        onClick={() => setPopup(false)}>
            close
        </button>
            </div>
        </div>
    )
};