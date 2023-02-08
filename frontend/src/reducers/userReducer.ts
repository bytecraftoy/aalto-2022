import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../utils/types';

/**
 * Redux slice for storing the info about logged user
 */

interface UserState {
    logged: boolean;
    info: Account | null;
}

/**
 * Initial state of the slice
 */
const initialState: UserState = {
    logged: false,
    info: null,
};

// The redux slice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Log in
        logIn(state, action: PayloadAction<Account>) {
            state.logged = true;
            state.info = action.payload;
        },
        // Log out
        logOut(state) {
            state.logged = false;
        },
    },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
