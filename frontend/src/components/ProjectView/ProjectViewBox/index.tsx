import React from "react";
import { ProjectInfo } from "../../../utils/types";
import { Surface } from "../../Surface";
import { FAB } from "../../Buttons";
import {openProject} from './../../../utils/projects';


interface ProjectViewBoxProps {
    project: ProjectInfo;
}

export const ProjectViewBox: React.FC<ProjectViewBoxProps> = ({
    project,
}) => {

    const pTitle = project.name
    const pID = project.name



    return (
        <Surface className="flex flex-row justify-center items-center m-[2%] w-2/5 max-sm:w-3/4 max-w-[800px] max-h-[500px] max-sm:m-[5%] max-sm:h-64"
            level={2}

        >
            <div
                className="hover:bg-secondary-90 rounded-2xl w-full h-full flex flex-row justify-center items-center transition-colors"
                onClick={() => openProject(project.id)}
            >
                <h1 className="text-2xl font-medium text-neutral-20">
                    {project.name}
                    <FAB icon="SettingsIcon" colorPalette="secondary" onClick={() => undefined} />
                </h1>
            </div>
        </Surface>
    );
}
