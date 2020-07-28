import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from 'stores/userStore';
import schedulerReducer from 'stores/schedulerStore';

const rootReducer = combineReducers({
  user: userReducer,
  scheduler: schedulerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
