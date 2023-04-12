import {
    deleteProject,
    getProject,
    getProjects,
    saveNewProject,
} from './../../utils/projects';
import { setProjects } from '../../reducers/projectReducer';
import { useAppDispatch } from './../../utils/hooks';
import { createEmptyProject } from '../../utils/types';
import { useImportProjectID } from './../../utils/hooks';
import { store } from '../../store';
import { renameProject } from './../../utils/projects';

export const useUpdateProjects = () => {
    const dispatch = useAppDispatch();
    return async () => {
        const res = await getProjects();
        if (res.success) {
            dispatch(setProjects(res.projects));
        } else {
            console.error(res.error);
        }
    };
};

export const useDeleteProject = () => {
    const updateProjects = useUpdateProjects();
    const importProject = useImportProjectID();
    return async (id: string) => {
        const delres = await deleteProject(id);
        if (!delres.success) {
            console.error(delres.error);
            return;
        }
        await updateProjects();
        const newProjects = store.getState();
        importProject(newProjects.projects.value[0].id);
    };
};

export const useCreateProject = () => {
    const updateProjects = useUpdateProjects();
    return async () => {
        const newP = await saveNewProject(createEmptyProject());
        if (!newP.success) {
            console.error(newP.error);
            return;
        }
        updateProjects();
    };
};

export const useCloneProject = () => {
    const updateProjects = useUpdateProjects();
    return async (id:string) => {
        const project = await getProject(id);
        if(!project.success) {
            console.error(project.error);
            return;
        }
        project.project.name += ' clone'
        const newProject = await saveNewProject(project.project);
        if(!newProject.success){
            console.error(newProject.error);
            return;
        }
        updateProjects();
    }
}

export const useRenameProject = () => {
    const updateProjects = useUpdateProjects();
    return async (id: string, newName: string) => {
        const res = await renameProject(id, newName);
        if(!res.success) {
            console.error(res.error);
            return;
        }
        updateProjects();
    };
};
