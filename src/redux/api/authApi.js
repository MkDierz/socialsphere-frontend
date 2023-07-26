import { toast } from 'react-toastify';
import { api } from './baseApi';
import { userApi } from './userApi';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
        credentials: 'include',
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        toast.promise(
          queryFulfilled,
          {
            pending: 'Logging in',
            success: 'Logged in',
            error: {
              render({ data }) {
                if (Array.isArray(data.error.data.message)) {
                  return 'Something is wrong';
                }
                return `${data.error.data.message}`;
              },
            },
          },
          await queryFulfilled.then(() => {
            dispatch(userApi.endpoints.profile.initiate(null)).refetch();
          }),
        );
      },
    }),
    register: builder.mutation({
      query: ({ username, email, password }) => ({
        url: '/auth/register',
        method: 'POST',
        body: { username, email, password },
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        toast.promise(
          queryFulfilled,
          {
            pending: 'Registering user',
            success: 'User registered, please Logged in',
            error: {
              render({ data }) {
                if (Array.isArray(data.error.data.message)) {
                  return 'Something is wrong';
                }
                return `${data.error.data.message}`;
              },
            },
          },
        );
      },
    }),
    refreshToken: builder.query({
      query: (refreshToken) => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body: { refreshToken },
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        toast.promise(
          queryFulfilled,
          {
            pending: 'Refreshing token',
            success: 'Token Refreshed',
            error: 'Unable to refresh token',
          },
        );
      },
    }),
    logout: builder.mutation({
      query: ({ accessToken, refreshToken }) => ({
        url: '/auth/logout',
        method: 'POST',
        body: { accessToken, refreshToken },
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        toast.promise(
          queryFulfilled,
          {
            pending: 'Logging out',
            success: 'Logged out',
            error: 'Unable to log out',
          },
        );
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenQuery,
  useLogoutMutation,
} = authApi;
