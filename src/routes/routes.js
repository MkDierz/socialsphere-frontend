import {
  Home,
  Login,
  PostDetail,
  Profile,
  ProfileEdit,
  Register,
  Search,
  TagDetail,
  UserProfileById,
} from '../pages';

const authProtectedRoutes = [
  {
    path: '/home',
    Component: Home,
  },
  {
    path: '/profile',
    Component: Profile,
  },
  {
    path: '/profile/edit',
    Component: ProfileEdit,
  },
  {
    path: '/profile/:id',
    Component: UserProfileById,
  },
  {
    path: '/search',
    Component: Search,
  },
  {
    path: '/tag/:id',
    Component: TagDetail,
  },
  {
    path: '/post/:id',
    Component: PostDetail,
  },
];

const publicRoutes = [
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/register',
    Component: Register,
  },
];

export { authProtectedRoutes, publicRoutes };
