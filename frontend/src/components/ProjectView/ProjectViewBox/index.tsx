import React, { useRef } from 'react';
import { ProjectInfo } from '../../../utils/types';
import { Surface } from '../../Surface';
import { getProject } from './../../../utils/projects';
import { useImportProject } from './../../../utils/hooks';
import { DropdownMenu } from '../../DropdownMenu';
import { useDeleteProject } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { useRenameProject } from '../hooks';
import { RenamePopup } from './RenamePopUp';
import { useState } from 'react';
import { useCloneProject } from '../hooks';

/**
 * A box that shows a project.
 */

interface ProjectViewBoxProps {
    project: ProjectInfo;
    showDelete: boolean;
}

export const ProjectViewBox: React.FC<ProjectViewBoxProps> = ({ project, showDelete }) => {
    const importProject = useImportProject();

    const settingsRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const rename = useRenameProject();

    const clone = useCloneProject();

    const [popupOpen, setPopup] = useState(false);

    const openProject = async (id: string) => {
        const res = await getProject(id);
        console.log(id, res);
        if (!res.success) console.error(res.error);
        else importProject(id, res.project);
    };

    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!settingsRef.current?.contains(e.target as Node)) {
            openProject(project.id);
            navigate('/about');
        }
    };

    const delProject = useDeleteProject();
    const choices = [{name: 'Rename', action: () => setPopup(true)}, {name: 'Clone', action: () => clone(project.id)}];
    if(showDelete){
        choices.push({name: 'Delete', action: () => delProject(project.id)});
    }

    return (
        <Surface
            className="flex flex-row justify-center items-center m-[2%] w-2/5 max-sm:w-3/4 max-w-[800px] max-h-[500px] max-sm:m-[5%] max-sm:h-64"
            level={2}
        >
            <RenamePopup
                        popupOpen={popupOpen}
                        setPopup={setPopup}
                        rename={(newName) => rename(project.id, newName)}
                    />

            <div
                className="hover:bg-secondary-90 rounded-2xl w-full h-full flex flex-row justify-center items-center transition-colors"
                onClick={clickHandler}
            >
                <h1 className="text-2xl font-medium text-neutral-20">
                    {project.name}
                </h1>
                <div ref={settingsRef}>
                    <DropdownMenu
                        icon="SettingsIcon"
                        choices={choices}
                    />
                </div>
            </div>
        </Surface>
    );
};
