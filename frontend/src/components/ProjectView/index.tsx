import React from 'react';
import { ProjectInfo } from '../../utils/types';
import { ProjectViewBox } from './ProjectViewBox';
import { FAB } from '../Buttons';
import { saveNewProject } from '../../utils/projects';
import { createEmptyProject } from '../../utils/types';

interface ProjectViewProps {
    projects: ProjectInfo[];
}

export const ProjectView: React.FC<ProjectViewProps> = ({ projects }) => {
    return (
        <div className="flex flex-row flex-wrap justify-center w-full min-h-screen">
            {projects.map((project, id) => {
                return <ProjectViewBox project={project} key={id} />;
            })}
            <div className="flex flex-row justify-center items-center">
                <FAB
                    icon="PlusIcon"
                    colorPalette="secondary"
                    onClick={() => saveNewProject(createEmptyProject())}
                />
            </div>
        </div>
    );
};
