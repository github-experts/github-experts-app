import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login: (state, action) => action.payload,
    logout: (state, action) => null,
  },
});

export const { login, logout } = userSlice.actions;

export const get = (state) => state.user;

export default userSlice.reducer;