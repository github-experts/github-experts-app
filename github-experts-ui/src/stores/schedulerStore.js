import { createSlice } from '@reduxjs/toolkit';

export const schedulerSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    storeSchedule: (state, action) => {
      return action.payload;
    },
  },
});

export const { storeSchedule } = schedulerSlice.actions;
export const getSchedule = (state) => state.scheduler;
export default schedulerSlice.reducer;
