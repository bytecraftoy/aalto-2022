import React from "react";
import { useState } from "react";
import classNames from "classnames";

//Pop-up window used to add n IO boxes

interface PopUpWindowProps {
    addPromptBoxes: (n: number) => void;
    
}

export const PopUpWindow: React.FC<PopUpWindowProps> = ({
    addPromptBoxes,
}) => {

    const [numberInput, setNumber] = useState<string>("");

    const [open, openPopup] = useState(false);

    // Adds multiple I/O boxes
    const addBoxes = (input:string) => {
        const n: number = +input;
        if(n > 0){
            addPromptBoxes(n);
        }
    };

    return (
        <div className={classNames(
            { hidden: open },
            "relative w-half flex flex-col items-center"
        )

        }>
            <div>
            <input
                className="px-4 py-2 rounded hover:bg-neutral-10 hover:bg-opacity-8"
                type="number"
                placeholder="0"
                id="numberOfBoxes"
                name="numberOfBoxes"
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
            </div>
        </div>
    )
};