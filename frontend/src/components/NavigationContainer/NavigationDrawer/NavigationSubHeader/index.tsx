import React from 'react';

/**
 * Header for the individual navigation category.
 * 
*/

interface SubHeaderProps {
    children: React.ReactNode;
}

export const NavigationSubHeader: React.FC<SubHeaderProps> = ({
    children
}) => {
  
    return (
        <div
            className='w-full h-14 px-4 py-[18px] leading-5'
        >
            {children}
        </div>
    )
}