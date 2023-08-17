import { Buffer } from 'buffer';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Mutex } from 'async-mutex';
import { toast } from 'react-toastify';
import { decompress } from '@mkdierz/json-compressor';
import { BASE_URL } from '../../config';

const mutex = new Mutex();

const prepareHeaders = (headers, { getState }) => {
  const { accessToken } = getState().auth;
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders,
});

function refresh(refreshToken, api, extraOptions) {
  return baseQuery(
    {
      credentials: 'include',
      method: 'POST',
      url: 'auth/refresh-token',
      body: { refreshToken },
    },
    api,
    extraOptions,
  );
}

async function customFetchBase(args, api, extraOptions) {
  const { getState } = api;
  const { auth, user } = getState();
  const { compress } = user.config;
  const { refreshToken } = auth;
  const newArgs = args;
  newArgs.headers = {
    ...args.headers,
    'Compressed-Response': compress,
  };

  if (compress !== 'none') {
    const transformResponse = async (response) => {
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer, 'utf-8');
      const decompressed = decompress(buffer);
      return decompressed;
    };

    newArgs.responseHandler = transformResponse;
  }

  await mutex.waitForUnlock();

  const result = await baseQuery(newArgs, api, extraOptions);
  if (!result.error) {
    return result;
  }

  const { status } = result.error;
  const isUnauthorized = status === 401;

  if (!(isUnauthorized)) {
    return result;
  }

  if (!refreshToken) {
    return result;
  }

  if (mutex.isLocked()) {
    await mutex.waitForUnlock();
    return baseQuery(args, api, extraOptions);
  }

  const release = await mutex.acquire();
  try {
    const promise = refresh(refreshToken, api, extraOptions).then(async (response) => {
      if (response.data) {
        await api.dispatch({ type: 'auth/login', payload: response.data });
        return baseQuery(args, api, extraOptions);
      }
      await api.dispatch({ type: 'auth/logout' });
      return api.dispatch({ type: 'user/resetUser' });
    });
    toast.promise(
      promise,
      {
        pending: 'Refreshing token',
        success: 'Token Refreshed',
        error: 'Unable to refresh token',
      },
    );
  } finally {
    release();
  }

  return result;
}

export default customFetchBase;
