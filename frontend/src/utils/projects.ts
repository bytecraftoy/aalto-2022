import { backendURL } from "./backendURL"
import { ContentPanelType } from "./types";

export const setProjects = async (panels: ContentPanelType[]): Promise<ContentPanelType[]> => {

    const response = await fetch(`${backendURL}/api/user/projects`, {
        method: "GET",
        credentials: "include",
    })

    // If the user is not logged in, return
    if(response.status === 401) return panels;

    // If the user is logged in, get the projects
    const data = await response.json();

    // If the user has no projects, create a new one
    if(!data.length) {
        await newProject('main', panels);
        return panels;
    }

    const projectID = data.find((project: {id: string, name: string}) => project.name === 'main')?.id;

    const newPanels = await saveProject(projectID);
    return newPanels;
}


// Create a new project
const newProject = async (name: string, panels: ContentPanelType[]) => {
    const project = {
        name,
        json: JSON.stringify({ panels })
    }

    await fetch(`${backendURL}/api/user/projects/new`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(project),
    });
}

// Save the project and return the new panels
const saveProject = async (id: string): Promise<ContentPanelType[]> => {

    const response = await fetch(`${backendURL}/api/user/projects/${id}`, {
        method: "GET",
        credentials: "include",
    });

    const backendResponse = await response.json();
    return backendResponse.data.panels as ContentPanelType[];
}