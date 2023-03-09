import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectInfo } from '../utils/types';

/**
 * Redux slice for storing the project ids of the application
 */

// State is all the projects of the application
interface ProjectsState {
    value: ProjectInfo[];
}

/**
 * Initial state of the projects is an empty array
 */
const initialState: ProjectsState = {
    value: [],
};

// Project slice
export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        // Sets the list of project ids
        setProjects: (state, action: PayloadAction<ProjectInfo[]>) => {
            state.value = action.payload;
        },
        // Empties the reducer
        clearProjects() {
            return {
                name: 'main',
                value: [],
            };
        },
    },
});

export const { setProjects, clearProjects } = projectSlice.actions;

export default projectSlice.reducer;
