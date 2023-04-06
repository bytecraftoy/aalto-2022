import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentPanelData, createEmptyPanel } from '../utils/types';

/**
 * Redux slice for storing all the content panels of the application
 *
 */

// State is all the ContentPanels of the application
interface PanelState {
    name: string;
    needsSaving: boolean;
    value: ContentPanelData[];
}

/**
 * Initial state of the panels is 1 empty panel
 */
const createIntialState = (): PanelState => {
    return {
        name: 'main',
        needsSaving: false,
        value: [createEmptyPanel()],
    };
};

// Panel slice
export const panelSlice = createSlice({
    name: 'panels',
    initialState: createIntialState(),
    reducers: {
        // Sets all the panels to new ones that correspond to the state saved in the db
        setSavedPanels(state, action: PayloadAction<ContentPanelData[]>) {
            state.value = action.payload;
            state.needsSaving = false;
        },
        // Sets all the panels to new ones that are not saved in the db
        setNewPanels(state, action: PayloadAction<ContentPanelData[]>) {
            state.value = action.payload;
            state.needsSaving = true;
        },
        // Updates a single content panel
        updatePanel(state, action: PayloadAction<ContentPanelData>) {
            state.value = state.value.map((panel) =>
                panel.id == action.payload.id ? action.payload : panel
            );
            state.needsSaving = true;
        },
        // Adds a new panel to the state
        addPanel(state) {
            state.value.push(createEmptyPanel());
            state.needsSaving = false;
        },
        // Remove a specific panel
        removePanel(state, action: PayloadAction<ContentPanelData>) {
            state.value = state.value.filter(
                (panel) => panel.id !== action.payload.id
            );
            state.needsSaving = true;
        },
        // Empties the reducer
        clearPanels() {
            return createIntialState();
        },
    },
});

export const {
    setSavedPanels,
    setNewPanels,
    updatePanel,
    addPanel,
    removePanel,
    clearPanels,
} = panelSlice.actions;

export default panelSlice.reducer;
