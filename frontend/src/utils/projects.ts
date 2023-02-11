import { backendURL } from './backendURL';
import { ContentPanelType, ProjectInfo } from './types';

/**
 * Functions for querying the projects in backend
 */

export const getProjects = async (
    panels: ContentPanelType[]
): Promise<[ContentPanelType[], ProjectInfo[]]> => {
    const response = await fetch(`${backendURL}/api/user/projects`, {
        method: 'GET',
        credentials: 'include',
    });

    // If the user is not logged in, return
    if (response.status === 401) return [panels, []];

    // If the user is logged in, get the projects
    const projects = (await response.json()) as ProjectInfo[];

    if (!projects.length) return [panels, []];

    const projectID = projects.find(
        (project: { id: string; name: string }) => project.name === 'main'
    )?.id;

    if (!projectID) return [panels, projects];

    const backednPanels = await fetch(
        `${backendURL}/api/user/projects/${projectID}`,
        {
            method: 'GET',
            credentials: 'include',
        }
    );

    if (backednPanels.status === 401) return [panels, projects];

    const backendResponse = await backednPanels.json();
    return [backendResponse.data.panels as ContentPanelType[], projects];
};

export const setProjects = async (
    panels: ContentPanelType[]
): Promise<[ContentPanelType[], ProjectInfo[]]> => {
    const response = await fetch(`${backendURL}/api/user/projects`, {
        method: 'GET',
        credentials: 'include',
    });

    // If the user is not logged in, return
    if (response.status === 401) return [panels, []];

    // If the user is logged in, get the projects
    const projects = (await response.json()) as ProjectInfo[];
    // If the user has no projects, create a new one
    if (!projects.length) {
        const id = await newProject('main', panels);

        if (!id) return [panels, []];
        // Id found, return the new panels and projects
        return [panels, [{ id, name: 'main' }]];
    }

    const projectID = projects.find(
        (project: { id: string; name: string }) => project.name === 'main'
    )?.id;

    // If the user has no project named 'main', return panels and projects
    if (!projectID) return [panels, projects];

    // If the user has a project named 'main', save it and return the new panels
    const newPanels = await saveProject(projectID);
    return [newPanels, projects];
};

// Create a new project
const newProject = async (
    name: string,
    panels: ContentPanelType[]
): Promise<string | undefined> => {
    const project = {
        name,
        json: JSON.stringify({ panels }),
    };

    const res = await fetch(`${backendURL}/api/user/projects/new`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(project),
    });

    if (res.status === 401) return;
    const id = await res.text();
    return id;
};

// Save the project and return the new panels
const saveProject = async (id: string): Promise<ContentPanelType[]> => {
    const response = await fetch(`${backendURL}/api/user/projects/${id}`, {
        method: 'GET',
        credentials: 'include',
    });

    const backendResponse = await response.json();
    return backendResponse.data.panels as ContentPanelType[];
};
