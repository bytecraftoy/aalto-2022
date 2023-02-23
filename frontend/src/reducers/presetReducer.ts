import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Preset } from '../utils/types';

/**
 * Redux slice for storing the presets fetched from backend
 */

interface PresetState {
    name: string;
    value: Preset[];
}

/**
 * Initialize store with empty array
 */
const initialState: PresetState = {
    name: 'main',
    value: [],
};

// Preset slice
export const presetSlice = createSlice({
    name: 'presets',
    initialState,
    reducers: {
        // Sets the presets
        setPresets(state, action: PayloadAction<Preset[]>) {
            state.value = action.payload;
        },
    },
});

export const { setPresets } = presetSlice.actions;
export default presetSlice.reducer;
