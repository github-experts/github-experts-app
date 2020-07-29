import { configureStore, combineReducers } from '@reduxjs/toolkit';
import schedulerReducer from 'stores/schedulerStore';

const rootReducer = combineReducers({
  scheduler: schedulerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
