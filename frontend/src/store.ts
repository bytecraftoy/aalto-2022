/**
 * React redux store, currently unused
 * May be removed later, depending on how
 * the project scope evolves.
 *
 */

import { configureStore } from '@reduxjs/toolkit';
import {
    panelReducer,
    userReducer,
    projectReducer,
    themeReducer,
    presetReducer,
    currentProjectReducer
} from './reducers';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        panels: panelReducer,
        user: userReducer,
        projects: projectReducer,
        presets: presetReducer,
        project: currentProjectReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type:
export type AppDispatch = typeof store.dispatch;

export { store };
