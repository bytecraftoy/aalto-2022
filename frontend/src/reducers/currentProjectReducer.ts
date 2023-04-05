import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentProjectState {
    value: {
        id: string;
    };
}

const initialState: CurrentProjectState = {
    value: {
        id: '',
    },
};

export const currentProjectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setCurrentProjectID: (state, action: PayloadAction<string>) => {
            state.value.id = action.payload;
        },
    },
});

export const { setCurrentProjectID } = currentProjectSlice.actions;

export default currentProjectSlice.reducer;
