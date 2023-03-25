import React from "react";
import { ContentPanelData } from "../../utils/types";
import { CategoryViewBox } from "./CategoryViewBox";



interface CategoryViewProps {
    panels: ContentPanelData[];
}


export const CategoryView: React.FC<CategoryViewProps> = ({
    panels,
}) => {
    return (
        <div className="flex flex-row flex-wrap justify-center w-full min-h-screen">

            {panels.map((panel, index) => {
                const url = `/panels/${panel.id}`;
                const name = panel.category || `Panel-${index + 1}`;

                return (

                    <CategoryViewBox panel={panel} key={panel.id} />

                );
            })}

        </div>
    );
}
