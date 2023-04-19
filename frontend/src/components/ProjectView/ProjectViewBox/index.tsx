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
import classNames from 'classnames';
import { DropdownItem } from '../../DropdownMenu/MenuItem';

/**
 * A box that shows a project.
 */

interface ProjectViewBoxProps {
    project: ProjectInfo;
    showDelete: boolean;
}

export const ProjectViewBox: React.FC<ProjectViewBoxProps> = ({
    project,
    showDelete,
}) => {
    const importProject = useImportProject();

    const settingsRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const rename = useRenameProject();

    const clone = useCloneProject();

    const [popupOpen, setPopup] = useState(false);

    const openProject = async (id: string) => {
        const res = await getProject(id);
        if (!res.success) console.error(res.error);
        else importProject(id, res.project);
    };

    //Handler for checking if user click on the project box or dropdown component
    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!settingsRef.current?.contains(e.target as Node)) {
            openProject(project.id);
            navigate('/about');
        }
    };

    const delProject = useDeleteProject();

    //Dropdown menu choises
    //Delete only appears if there are multiple projects
    const choices: DropdownItem[] = [
        { name: 'Rename', icon: 'PencilIcon', action: () => setPopup(true) },
        {
            name: 'Clone',
            icon: 'DocumentDuplicateIcon',
            action: () => clone(project.id),
        },
    ];
    if (showDelete) {
        choices.push({
            name: 'Delete',
            icon: 'XMarkIcon',
            color: 'red',
            action: () => delProject(project.id),
        });
    }

    return (
        <Surface
            className="flex flex-row justify-center items-center m-[2%] w-2/5 max-sm:w-3/4 max-w-[800px] max-h-[500px] min-h-[280px] max-sm:m-[5%] max-sm:h-64"
            level={2}
        >
            <RenamePopup
                popupOpen={popupOpen}
                setPopup={setPopup}
                rename={(newName) => rename(project.id, newName)}
            />

            <div
                className="hover:bg-secondary-90/30 cursor-pointer rounded-2xl w-full h-full flex flex-row justify-center items-center transition-colors"
                onClick={clickHandler}
            >
                <h1
                    className={classNames(
                        { 'text-2xl': project.name.length < 20 },
                        { 'text-xl': project.name.length < 40 },
                        'pl-8 text-center break-all font-medium text-neutral-20 inline-block'
                    )}
                >
                    {project.name}
                </h1>
                <div ref={settingsRef} className="p-2">
                    <DropdownMenu icon="SettingsIcon" items={choices} />
                </div>
            </div>
        </Surface>
    );
};
