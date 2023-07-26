import { createApi } from '@reduxjs/toolkit/dist/query/react';
import customFetchBase from './baseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: customFetchBase,
  tagTypes: ['auth', 'posts', 'post', 'tags', 'user', 'users', 'profile'],
  endpoints: () => ({}),
});
export default api;
