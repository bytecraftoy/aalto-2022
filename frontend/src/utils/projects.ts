import { apiFetch, apiFetchJSON } from './apiFetch';
import { Project, ProjectInfo, ContentPanelType } from './types';

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
 * Get initial the states for the current project (panels)
 * and for the list of user's projects.
 * Looks for existing projects in the database
 * and creates a new one if 'main' project is not found and write is true.
 * Never throws an error.
 * Does not read or modify the redux store.
 * @param {ContentPanelType[]} panels Default panels to use if the user has no saved projects.
 * @param {boolean} write If true, add the default project to the database. Defaults to true.
 */
export const initializeUserProjects = async (
    panels: ContentPanelType[],
    write = true
): Promise<[ContentPanelType[], ProjectInfo[]]> => {
    const projectsRes = await getProjects();

    if (!projectsRes.success)
        //user is not logged in or some error that we can not fix has occured
        return [panels, []];

    if (projectsRes.projects.length === 0) {
        if (write) {
            //the user has now projects so create a new one
            const name = 'main';
            const saveRes = await saveNewProject({ name, data: { panels } });
            if (saveRes.success) return [panels, [{ id: saveRes.id, name }]];
            //an unrecoverable error
        }
        return [panels, []];
    }

    //find the user's main project
    const projectId = projectsRes.projects.find((p) => p.name === 'main')?.id;

    if (projectId) {
        const projectRes = await getProject(projectId);
        if (projectRes.success)
            //if the main project was found and successfully fetched, return it
            return [projectRes.project.data.panels, projectsRes.projects];
    }

    //otherwise return the default project
    return [panels, projectsRes.projects];
};
