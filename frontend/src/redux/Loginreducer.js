// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'eduauth',
  initialState: {
    user: null,
    isAuthenticated: false,
    eduauth: 'eduauth'
  },
  reducers: {
    loginSuccess: (state, action) => {
      // console.log(action.payload);
      state.user = action.payload;
      // console.log(action.payload);
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
