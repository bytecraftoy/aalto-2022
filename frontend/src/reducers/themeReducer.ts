import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme, DEFAULT_PARAMETERS, createEmptyProject } from '../utils/types';

/**
 * Redux slice for storing theme and global parameters for the application
 *
 */

interface ThemeState {
    name: string;
    value: Theme;
}

/**
 * Initialize
 */
const initialState: ThemeState = {
    name: 'main',
    value: createEmptyProject().data.theme,
};

// Panel slice
export const panelSlice = createSlice({
    name: 'panels',
    initialState,
    reducers: {
        // Sets all the panels to new ones
        setPanels(state, action: PayloadAction<ContentPanelType[]>) {
            state.value = action.payload;
        },
        // Updates a single content panel
        updatePanel(state, action: PayloadAction<ContentPanelType>) {
            state.value = state.value.map((panel) =>
                panel.id == action.payload.id ? action.payload : panel
            );
        },
        // Adds a new panel to the state
        addPanel(state) {
            const newPanel: ContentPanelType = {
                id: generate(),
                category: '',
                prompts: [
                    { id: uuidv4(), input: '', output: '', locked: false },
                ],
                parameters: DEFAULT_PARAMETERS,
            };
            state.value.push(newPanel);
        },
        // Remove a specific panel
        removePanel(state, action: PayloadAction<ContentPanelType>) {
            state.value = state.value.filter(
                (panel) => panel.id !== action.payload.id
            );
        },
        // Empties the reducer
        clearPanels() {
            return {
                name: 'main',
                value: [
                    {
                        id: generate(),
                        category: '',
                        prompts: [
                            {
                                id: uuidv4(),
                                input: '',
                                output: '',
                                locked: false,
                            },
                        ],
                        parameters: DEFAULT_PARAMETERS,
                    },
                ],
            };
        },
    },
});

export const { setPanels, updatePanel, addPanel, removePanel, clearPanels } =
    panelSlice.actions;

export default panelSlice.reducer;
