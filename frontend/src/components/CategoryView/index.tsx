import React from "react";
import { ContentPanelData } from "../../utils/types";
import { NavigationLink } from "../NavigationContainer/NavigationDrawer/NavigationLink";
import { CategoryViewBox } from "./CategoryViewBox";
import { solidIcon } from "../../utils/icons";



interface CategoryViewProps {
    panels: ContentPanelData[];
}


export const CategoryView: React.FC<CategoryViewProps> = ({
    panels,
}) => {
    return (
        <div>
            {panels.map((panel, index) => {
                const url = `/panels/${panel.id}`;
                const name = panel.category || `Panel-${index + 1}`;

                return (
                    <div
                        key={panel.id}
                        className="w-full h-14 flex flex-row justify-between items-center group"
                    >
                        <CategoryViewBox panel = {panel}/>

                    </div>
                );
            })}
        </div>
    );
}
