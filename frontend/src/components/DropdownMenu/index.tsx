import React,{useState, useRef, useEffect} from 'react';
import classNames from 'classnames';
import { Icon, solidIcon } from '../../utils/icons';

/**
 * Content panel dropdown menu and its components
 *
 */

interface DropdownMenuProps {
    addPromptBoxes: (n: number) => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    addPromptBoxes,
}

) => {

    const [open, setOpen] = useState(false);

    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Closes the menu if clicked outside of the menu
        const close = (e: MouseEvent) => {
            if (!drawerRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        // Add new event listener
        document.addEventListener('mousedown', close);

        return () => {
            document.removeEventListener('mousedown', close);
        };
    }, []);

    const addBoxes=(number:number)=>{
        addPromptBoxes(number)
        setOpen(false)
    }

    return (
        <div className='relative'>
            <button
                onClick={() => setOpen(!open)}
                className={classNames(
                    ''
                )}
            >
                {solidIcon('cog-6-tooth', 'w-8 h-8 text-primary-30 ')}
            </button>
            <div ref={drawerRef} className={classNames('absolute bg-white divide-y divide-white-100 rounded shadow w-44 dark:bg-white', {"hidden":!open})}>
                <a href='#' onClick={() => addBoxes(5)} className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Add 5</a>
                <a href='#' onClick={() => addBoxes(10)} className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Add 10</a>
            </div>
        </div>
    );
};