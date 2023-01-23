import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentPanelType } from '../utils/types';
import { generate } from 'shortid';
import { v4 as uuidv4 } from 'uuid';

/**
 * Redux slice for storing all the content panels of the application
 *
 */

// State is all the ContentPanels of the application
interface PanelState {
    value: ContentPanelType[];
}

/**
 * Initial state of the panels is 1 empty panel
 */
const initialState: PanelState = {
    value: [
        {
            id: generate(),
            category: '',
            prompts: [{ id: uuidv4(), input: '', output: '', locked: false }],
        },
    ],
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
            };
            state.value.push(newPanel);
        },
    },
});

export const { setPanels, updatePanel, addPanel } = panelSlice.actions;

export default panelSlice.reducer;
