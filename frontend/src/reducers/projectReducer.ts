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
        saveProjects: (state, action: PayloadAction<ProjectInfo[]>) => {
            state.value = action.payload;
        },
    },
});

export const { saveProjects } = projectSlice.actions;

export default projectSlice.reducer;
