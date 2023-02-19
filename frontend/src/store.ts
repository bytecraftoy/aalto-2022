/**
 * React redux store, currently unused
 * May be removed later, depending on how
 * the project scope evolves.
 *
 */

import { configureStore } from '@reduxjs/toolkit';
import panelReducer from './reducers/panelReducer';
import userReducer from './reducers/userReducer';
import projectReducer from './reducers/projectReducer';

const store = configureStore({
    reducer: {
        panels: panelReducer,
        user: userReducer,
        projects: projectReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type:
export type AppDispatch = typeof store.dispatch;

export { store };
