/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';

const initialState = {
  logs: [],
};

const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    reset: () => initialState,
    add: (state, action) => {
      const data = action.payload;
      state.logs = [...state.logs, data];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.logs = initialState.logs;
      });
  },
});

export const { reset, add } = logSlice.actions;

export default logSlice.reducer;
