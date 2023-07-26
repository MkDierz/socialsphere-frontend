import {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenQuery,
  useRegisterMutation,
} from './authApi';
import {
  usePostByIdQuery,
  usePostCreateMutation,
  usePostDeleteMutation,
  usePostsByUserQuery,
  usePostsQuery,
  usePostUpdateMutation,
} from './postApi';
import {
  useTagByIdQuery,
  useTagCreateMutation,
  useTagDeleteMutation,
  useTagsQuery,
  useTagUpdateMutation,
} from './tagApi';
import {
  useFriendRequestMutation,
  useFriendRequestReceivedQuery,
  useFriendRequestSentQuery,
  useFriendRequestUpdateMutation,
  useProfileByIdQuery,
  useProfileQuery,
  useProfileUpdateMutation,
  useUserFriendsQuery,
  useUserSearchQuery,
} from './userApi';
import { api } from './baseApi';

export {
  api,
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenQuery,
  useLogoutMutation,
  usePostsQuery,
  usePostByIdQuery,
  usePostsByUserQuery,
  usePostCreateMutation,
  usePostUpdateMutation,
  usePostDeleteMutation,
  useTagsQuery,
  useTagCreateMutation,
  useTagDeleteMutation,
  useTagByIdQuery,
  useTagUpdateMutation,
  useProfileQuery,
  useProfileByIdQuery,
  useProfileUpdateMutation,
  useUserSearchQuery,
  useUserFriendsQuery,
  useFriendRequestMutation,
  useFriendRequestReceivedQuery,
  useFriendRequestSentQuery,
  useFriendRequestUpdateMutation,
};
