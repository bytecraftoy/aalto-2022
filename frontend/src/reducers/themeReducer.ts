import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme, DEFAULT_THEME } from '../utils/types';

/**
 * Redux slice for storing theme and global parameters for the application
 * Used by the about page
 */

interface ThemeState {
    name: string;
    value: Theme;
}

/**
 * Initialize store from the default theme template
 */
const initialState: ThemeState = {
    name: 'main',
    value: DEFAULT_THEME,
};

// Theme slice
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        // Sets the theme
        setTheme(state, action: PayloadAction<Theme>) {
            state.value = action.payload;
        },
        // Empties the reducer
        clearTheme() {
            return {
                name: 'main',
                value: DEFAULT_THEME,
            };
        },
    },
});

export const { setTheme, clearTheme } = themeSlice.actions;
export default themeSlice.reducer;
