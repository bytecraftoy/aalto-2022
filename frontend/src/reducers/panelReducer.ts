import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentPanelType } from "../utils/types";
import { generate } from 'shortid';
import { v4 as uuidv4 } from 'uuid';

/**
 * Redux slice for storing all the content panels of the application 
 * 
*/


// State is all the ContentPanels of the application
interface PanelState {
    value: ContentPanelType[]
}

/**
 * Initial state of the panels is 1 empty panel
*/
const initialState: PanelState = {
    value: [{
        id: generate(),
        category: '',
        prompts: [
            { id: uuidv4(), input: '', output: '', locked: false }
        ]
    }]
};

// Panel slice
export const panelSlice = createSlice({
    name: 'panels',
    initialState,
    reducers: {
        setPanels(state, action: PayloadAction<ContentPanelType[]>) {
            state.value = action.payload;
        }
    }
});

export const { setPanels } = panelSlice.actions;

export default panelSlice.reducer;
