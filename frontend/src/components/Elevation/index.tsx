import React from 'react';

type Props = {
    children: JSX.Element
}

export const Elevation: React.FC<Props> = ({children}) => {
    return (
        <div
            className='bg-white bg-opacity-5'
        >
            {children}
        </div>
    ); 
}