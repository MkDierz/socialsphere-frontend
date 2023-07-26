import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi';
import { authApi } from '../api/authApi';

const initialState = {
  user: {
    id: null,
    name: null,
    username: null,
    email: null,
    avatar: null,
    createdAt: null,
    updatedAt: null,
  },
  profile: {
    id: null,
    userId: null,
    bio: null,
    location: null,
    public: false,
    cover: null,
    createdAt: null,
    updatedAt: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: () => initialState,
    updateUser: (state, action) => {
      const { Profile, ...user } = action.payload;
      state.profile = Profile;
      state.user = user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.profile.matchFulfilled, (state, action) => {
        const { Profile: profile, ...user } = action.payload;
        state.user = user;
        state.profile = profile;
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = {};
        state.profile = {};
      });
  },
});

export const { resetUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
