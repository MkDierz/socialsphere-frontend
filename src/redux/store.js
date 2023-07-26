import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice, userSlice } from './reducer';
import { api } from './api/baseApi';

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
  blacklist: [api.reducerPath],
};

const authPersist = persistReducer(persistConfig, authSlice);
const userPersist = persistReducer({ ...persistConfig, key: 'user' }, userSlice);

export const createStore = (options) => configureStore({
  reducer: {
    auth: authPersist,
    user: userPersist,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(api.middleware),
  ...options,
});

export const store = createStore();

export const persistor = persistStore(store);

export const useAppSelector = useSelector;
export const useAppDispatch = useDispatch;
