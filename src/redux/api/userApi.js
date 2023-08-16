import { api } from './baseApi';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: '/user/profile',
      }),
      providesTags: ['profile'],
    }),
    profileById: builder.query({
      query: (id) => ({
        url: `/user/profile/${id}`,
      }),
    }),
    profileUpdate: builder.mutation({
      query: ({
        name, username, email, bio, location, password, compress,
      }) => {
        const body = {
          ...(name && { name }),
          ...(username && { username }),
          ...(email && { email }),
          ...(bio && { bio }),
          ...(location && { location }),
          ...(password && { password }),
          ...(compress && { compress }),
        };
        return {
          url: '/user/profile',
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['profile'],
    }),
    userSearch: builder.query({
      query: (query) => ({
        url: `/user?query=${query}`,
      }),
    }),
    userFriends: builder.query({
      query: () => ({
        url: '/user/friend',
      }),
    }),
    friendRequest: builder.mutation({
      query: ({ username }) => {
        const body = {
          username,
        };
        return {
          url: 'user/friend-request',
          method: 'POST',
          body,
        };
      },
    }),
    friendRequestReceived: builder.query({
      query: () => ({
        url: 'user/friend-request',
      }),
    }),
    friendRequestSent: builder.query({
      query: () => ({
        url: 'user/friend-request/sent',
      }),
    }),
    friendRequestUpdate: builder.mutation({
      query: ({ username, accepted }) => {
        const body = {
          ...(accepted ? { status: 'ACCEPTED' } : { status: 'UNACCEPTED' }),
          username,
        };
        return {
          url: '/user/friend-request',
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});

export const {
  useProfileQuery,
  useProfileByIdQuery,
  useProfileUpdateMutation,
  useUserSearchQuery,
  useUserFriendsQuery,
  useFriendRequestMutation,
  useFriendRequestReceivedQuery,
  useFriendRequestSentQuery,
  useFriendRequestUpdateMutation,
} = userApi;
