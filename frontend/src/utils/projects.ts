import { apiFetch, apiFetchJSON } from './apiFetch';
import { Project, ProjectInfo, createEmptyProject } from './types';
import {setTheme} from './../reducers/themeReducer';
import {setPanels} from './../reducers/panelReducer';
import {setCurrentProjectID} from './../reducers/currentProjectReducer';
import {store} from './../store';

/**
 * Utilities for fetching and saving projects to the database and
 * initializing projects for the application
 */

/**
 * A helper function for handling errors
 */
const handleError = (err: unknown): { success: false; error: Error } => {
    console.error(err);
    return {
        success: false,
        error: err instanceof Error ? err : new Error(),
    };
};

/**
 * Get a list of user's projects.
 * Never throws an error.
 */
export const getProjects = async (): Promise<
    | { success: true; projects: ProjectInfo[] }
    | { success: false; error: Error }
> => {
    try {
        const projects = await apiFetchJSON('/api/user/projects');
        return { success: true, projects };
    } catch (err) {
        return handleError(err);
    }
};

/**
 * Get a project by id.
 * Never throws an error.
 */
export const getProject = async (
    id: string
): Promise<
    { success: true; project: Project } | { success: false; error: Error }
> => {
    try {
        const project = await apiFetchJSON(`/api/user/projects/${id}`);
        return {
            success: true,
            project,
        };
    } catch (err) {
        return handleError(err);
    }
};

/**
 * Save a project by id.
 * Never throws an error.
 * If you are about to save the currently open project,
 * consider using saveCurrentProject instread.
 */
export const saveProject = async (
    id: string,
    project: Project
): Promise<{ success: true } | { success: false; error: Error }> => {
    try {
        await apiFetch(`/api/user/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
        });
        return { success: true };
    } catch (err) {
        return handleError(err);
    }
};

export const saveCurrentProject = async (project: Project) => {
    const currentId = store.getState().project.value.id;
    return await saveProject(currentId, project);
};

/**
 * Save a new project.
 * The id for the new project will be in the returned object if successful.
 * Never throws an error.
 */
export const saveNewProject = async (
    project: Project
): Promise<
    { success: true; id: string } | { success: false; error: Error }
> => {
    try {
        const id = await apiFetch('/api/user/projects/new', {
            method: 'POST',
            body: JSON.stringify(project),
        });
        return { success: true, id };
    } catch (err) {
        return handleError(err);
    }
};

/**
 * Get project's id by its name.
 * Never throws an error.
 */
export const getProjectIdByName = async (
    name: string
): Promise<
    { success: true; id: string } | { success: false; error: Error }
> => {
    const projects = await getProjects();
    if (!projects.success) return projects;

    const id = projects.projects.find((p) => p.name === name)?.id;
    if (id === undefined)
        return {
            success: false,
            error: new Error('Project not found'),
        };

    return { success: true, id };
};

/**
 * Get a project by name.
 * Never throws an error.
 */
export const getProjectByName = async (
    name: string
): Promise<
    { success: true; project: Project } | { success: false; error: Error }
> => {
    const id = await getProjectIdByName(name);
    if (!id.success) return id;

    return await getProject(id.id);
};

/**
 * Get initial the states for the current project (theme and panels)
 * and for the list of user's projects.
 * Looks for existing projects in the database
 * and creates a new one if there is no main project and write is set to true.
 * Never throws an error.
 * Does not read or modify the redux store.
 * @param {boolean} write If true, add the default project to the database. Defaults to true.
 */
export const initializeUserProjects = async (
    write = true
): Promise<[string, Project, ProjectInfo[]]> => {
    const projectListRes = await getProjects();

    if (projectListRes.success) {
        if (projectListRes.projects.length === 0) {
            if (write) {
                // the user has no projects so create a new one
                const newProj = createEmptyProject();
                const saveRes = await saveNewProject(newProj);
                if (saveRes.success)
                    return [saveRes.id, newProj, [{ id: saveRes.id, name: newProj.name }]];
            }
            // no write allowed, so fallback to default return at the end of the method
        } else {
            // find the user's main project (sorted by how how recently they were saved)
            // currently not supported by database schema, so just choose the first one
            const projectId = projectListRes.projects[0].id;
            const projectRes = await getProject(projectId);
            if (projectRes.success)
                // Main project successfully fetched, return it
                return [projectId, projectRes.project, projectListRes.projects];
        }
    }

    //user was not logged in or some unrecoverable error occurred
    return ['', createEmptyProject(), []];
};

/**
 * 
 */
export const openProject = async (id:string) => {
    const res = await getProject(id);
    if(!res.success){
        console.error(res.error);
        return;
    }
    const project = res.project;
    store.dispatch(setTheme(project.data.theme));
    store.dispatch(setPanels(project.data.panels));
    store.dispatch(setCurrentProjectID(id));
};