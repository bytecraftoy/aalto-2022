import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentPanelData, createEmptyPanel } from '../utils/types';

/**
 * Redux slice for storing all the content panels of the application
 *
 */

// State is all the ContentPanels of the application
interface PanelState {
    name: string;
    value: ContentPanelData[];
}

/**
 * Initial state of the panels is 1 empty panel
 */
const initialState: PanelState = {
    name: 'main',
    value: [createEmptyPanel()],
};

// Panel slice
export const panelSlice = createSlice({
    name: 'panels',
    initialState,
    reducers: {
        // Sets all the panels to new ones
        setPanels(state, action: PayloadAction<ContentPanelData[]>) {
            state.value = action.payload;
        },
        // Updates a single content panel
        updatePanel(state, action: PayloadAction<ContentPanelData>) {
            state.value = state.value.map((panel) =>
                panel.id == action.payload.id ? action.payload : panel
            );
        },
        // Adds a new panel to the state
        addPanel(state) {
            state.value.push(createEmptyPanel());
        },
        // Remove a specific panel
        removePanel(state, action: PayloadAction<ContentPanelData>) {
            state.value = state.value.filter(
                (panel) => panel.id !== action.payload.id
            );
        },
        // Empties the reducer
        clearPanels() {
            return {
                name: 'main',
                value: [createEmptyPanel()],
            };
        },
    },
});

export const { setPanels, updatePanel, addPanel, removePanel, clearPanels } =
    panelSlice.actions;

export default panelSlice.reducer;
