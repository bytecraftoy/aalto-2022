import React from "react";
import { ContentPanelData } from "../../../utils/types";
import { NavigationLink } from "../../NavigationContainer/NavigationDrawer/NavigationLink";
import { solidIcon } from "../../../utils/icons";


interface CategoryViewBoxProps {
    panel: ContentPanelData;
}

export const CategoryViewBox: React.FC<CategoryViewBoxProps> = ({
    panel,
}) => {


    const link = "/panels/" + panel.id

    return (
        <div>
            <div
                className="w-full flex flex-col items-center justify-between z-10 bg-primary-90 rounded-lg min-h-fit">
                    <NavigationLink
                        label = {panel.category}
                        icon={solidIcon('CubeIcon')}
                        to= {link}
                    />

            </div>

        </div>
    );
}
