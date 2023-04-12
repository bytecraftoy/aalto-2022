import React from 'react';
import { ProjectInfo } from '../../utils/types';
import { ProjectViewBox } from './ProjectViewBox';
import { FAB } from '../Buttons';
import { useCreateProject } from './hooks';

interface ProjectViewProps {
    projects: ProjectInfo[];
}
/**
 * Boxes that indicate projects and an option to create more
 */

export const ProjectView: React.FC<ProjectViewProps> = ({ projects }) => {
    const addProject = useCreateProject();

    return (
        <div className="flex flex-row flex-wrap justify-center w-full min-h-screen">
            {projects.map((project, id) => {
                return (
                    <ProjectViewBox
                        project={project}
                        key={id}
                        showDelete={projects.length > 1}
                    />
                );
            })}
            <div className="flex flex-row justify-center items-center m-[2%] w-2/5 max-sm:w-3/4 max-w-[800px] max-h-[500px] max-sm:m-[5%] max-sm:h-64">
                <FAB
                    icon="PlusIcon"
                    colorPalette="secondary"
                    onClick={addProject}
                />
            </div>
        </div>
    );
};
