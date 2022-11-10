/**
 * React redux store, currently unused
 * May be removed later, depending on how
 * the project scope evolves.
 *
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';

//Todo: create the store with reducers here
const reducer = combineReducers({});

const store = configureStore({
    reducer,
});

export { store };
