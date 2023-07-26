import { toast } from 'react-toastify';
import { api } from './baseApi';

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postById: builder.query({
      query: (id) => ({
        url: `/post/${id}`,
      }),
      providesTags: ['post'],
      async onQueryStarted(args, { queryFulfilled }) {
        toast.promise(
          queryFulfilled,
          {
            pending: 'Getting post',
            success: 'Post acquired',
            error: 'Unable to get pos',
          },
        );
      },
    }),

    posts: builder.query({
      query: (query) => {
        const queries = [];
        if (query) {
          queries.push(`query=${query}`);
        }
        const url = (queries.length === 0) ? '/post/' : `/post/?${queries.join('&')}`;

        return {
          url,
          credentials: 'include',
        };
      },
      providesTags: ['posts'],
      async onQueryStarted(args, { queryFulfilled }) {
        toast.promise(
          queryFulfilled,
          {
            pending: 'Getting posts',
            success: 'Posts acquired',
            error: 'Unable to get post',
          },
        );
      },
    }),

    postsByUser: builder.query({
      query: (userId) => {
        const queries = [];
        if (userId) {
          queries.push(`userId=${userId}`);
        }
        const url = (queries.length === 0) ? '/post/' : `/post/?${queries.join('&')}`;
        return {
          url,
          credentials: 'include',
        };
      },
      providesTags: ['posts'],
      async onQueryStarted(args, { queryFulfilled }) {
        toast.promise(
          queryFulfilled,
          {
            pending: 'Getting posts',
            success: 'Posts acquired',
            error: 'Unable to get post',
          },
        );
      },
    }),

    postCreate: builder.mutation({
      query: ({ parentId, content, tags }) => {
        const body = {};
        if (parentId) {
          body.parentId = parentId;
        }
        if (content) {
          body.content = content;
        }
        if (tags) {
          body.tags = tags;
        }
        return {
          url: '/post/',
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: ['posts', 'post'],
      async onQueryStarted(args, { queryFulfilled }) {
        toast.promise(
          queryFulfilled,
          {
            pending: 'Creating posts',
            success: 'Posts created',
            error: 'Unable to create post',
          },
        );
      },
    }),

    postUpdate: builder.mutation({
      query: ({ id, content, tags }) => {
        const body = {};
        if (content) {
          body.content = content;
        }
        if (tags) {
          body.tags = tags;
        }
        return {
          url: `/post/${id}`,
          method: 'PUT',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: ['posts', 'post'],
      async onQueryStarted(args, { queryFulfilled }) {
        toast.promise(
          queryFulfilled,
          {
            pending: 'Updating posts',
            success: 'Posts updated',
            error: 'Unable to update post',
          },
        );
      },
    }),

    postDelete: builder.mutation({
      query: ({ id }) => ({
        url: `/post/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['posts'],
      async onQueryStarted(args, { queryFulfilled }) {
        toast.promise(
          queryFulfilled,
          {
            pending: 'Deleting posts',
            success: 'Posts deleted',
            error: 'Unable to delete post',
          },
        );
      },
    }),
  }),
});

export const {
  usePostsQuery,
  usePostsByUserQuery,
  usePostByIdQuery,
  usePostCreateMutation,
  usePostUpdateMutation,
  usePostDeleteMutation,
} = postApi;
