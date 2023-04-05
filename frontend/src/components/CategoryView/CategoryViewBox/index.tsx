import React from 'react';
import { ContentPanelData } from '../../../utils/types';
import { Link } from 'react-router-dom';
import { Surface } from '../../Surface';

interface CategoryViewBoxProps {
    panel: ContentPanelData;
}

export const CategoryViewBox: React.FC<CategoryViewBoxProps> = ({ panel }) => {
    const link = '/panels/' + panel.id;
    let category = panel.category;
    if (category == '') {
        category = 'No category';
    }

    const boxNum = panel.prompts.length;

    return (
        <Surface
            className="flex flex-row justify-center items-center m-[2%] w-2/5 max-sm:w-3/4 max-w-[800px] max-h-[500px] max-sm:m-[5%] max-sm:h-64"
            level={2}
        >
            <Link
                className="hover:bg-secondary-90 rounded-2xl w-full h-full flex flex-row justify-center items-center transition-colors"
                to={link}
            >
                <h1 className="text-2xl font-medium text-neutral-20">
                    {category} {boxNum}
                </h1>
            </Link>
        </Surface>
    );
};
