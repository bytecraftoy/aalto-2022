/**
 * React redux store, currently unused
 * May be removed later, depending on how
 * the project scope evolves.
 *
 */

import { configureStore } from '@reduxjs/toolkit';
import panelReducer from './reducers/panelReducer';

const store = configureStore({
    reducer: {
        panels: panelReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type:
export type AppDispatch = typeof store.dispatch;

export { store };
