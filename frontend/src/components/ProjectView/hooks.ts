import { deleteProject, getProjects, saveNewProject } from './../../utils/projects';
import { setProjects } from '../../reducers/projectReducer';
import { useAppDispatch } from './../../utils/hooks';
import { createEmptyProject } from '../../utils/types';


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
}

export const useDeleteProject = () => {
    const updateProjects = useUpdateProjects();
    return async (id: string) => {
        const projects = await getProjects();
        if (projects.success) {
            if (projects.projects.length > 1) {
                const delres = await deleteProject(id);
                if (!delres.success) {
                    console.error(delres.error);
                    return;
                }
            }
        }
        updateProjects();
    };
}

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
}