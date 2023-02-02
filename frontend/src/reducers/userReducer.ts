import { createSlice } from '@reduxjs/toolkit';

/**
 * Redux slice for storing the ifo about logged user
 */

interface UserState {
    logged: boolean;
}

/**
 * Initial state of the slice
 */
const initialState: UserState = {
    logged: false,
};

// The redux slice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Log in
        logIn(state) {
            state.logged = true;
        },
        // Log out
        logOut(state) {
            state.logged = false;
        },
    },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
