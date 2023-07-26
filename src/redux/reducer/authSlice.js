import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    login: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const { accessToken, refreshToken } = action.payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, action) => {
        const { accessToken, refreshToken } = action.payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.isAuthenticated = true;
      });
  },
});

export default slice.reducer;
export const { logout, login } = slice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
