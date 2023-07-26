import { toast } from 'react-toastify';
import { api } from './baseApi';

export const tagApi = api.injectEndpoints({
  endpoints: (builder) => ({

    tags: builder.query({
      query: (query, names, userId) => {
        const queries = [];
        if (names !== undefined) {
          queries.push(`name=${names}`);
        }
        if (query !== undefined) {
          queries.push(`query=${query}`);
        }
        if (userId !== undefined) {
          queries.push(`userId=${userId}`);
        }
        const url = (queries.length === 0) ? '/tag' : `/tag?${queries.join('&')}`;
        return {
          url,
          credentials: 'include',
        };
      },
      providesTags: ['tags'],
      async onQueryStarted(args, { queryFulfilled }) {
        toast.promise(
          queryFulfilled,
          {
            pending: 'Getting tags',
            success: 'Tags acquired',
            error: 'Unable to get tags',
          },
        );
      },
    }),

    tagById: builder.query({
      query: (id) => ({
        url: `/tag/${id}`,
        credentials: 'include',
      }),
    }),

    tagCreate: builder.mutation({
      query: ({ name }) => {
        const body = {};
        body.name = name;
        return {
          url: '/tag/',
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: ['tags'],
      async onQueryStarted(args, { queryFulfilled }) {
        toast.promise(
          queryFulfilled,
          {
            pending: 'Creating tags',
            success: 'Tags created',
            error: 'Unable to create tags',
          },
        );
      },
    }),

    tagUpdate: builder.mutation({
      query: ({ id, name }) => {
        const body = {
          name,
        };
        return {
          url: `/tag/${id}`,
          method: 'PUT',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: ['tags'],
      async onQueryStarted(args, { queryFulfilled }) {
        toast.promise(
          queryFulfilled,
          {
            pending: 'Updating tag',
            success: 'Tag updated',
            error: 'Unable to update tag',
          },
        );
      },
    }),

    tagDelete: builder.mutation({
      query: ({ id }) => ({
        url: `/tag/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['tags'],
      async onQueryStarted(args, { queryFulfilled }) {
        toast.promise(
          queryFulfilled,
          {
            pending: 'Deleting tag',
            success: 'Tag deleted',
            error: 'Unable to delete tag',
          },
        );
      },
    }),

  }),
});

export const {
  useTagsQuery,
  useTagByIdQuery,
  useTagCreateMutation,
  useTagUpdateMutation,
  useTagDeleteMutation,
} = tagApi;
