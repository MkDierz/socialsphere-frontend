import { Buffer } from 'buffer';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Mutex } from 'async-mutex';
import { toast } from 'react-toastify';
import {
  calculateSize, decompress, gunzip, unpack,
} from '@mkdierz/json-compressor';
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
  await mutex.waitForUnlock();
  const { getState, dispatch } = api;
  const { auth, user } = getState();
  const compress = user.config.compress || 'none';
  const { refreshToken } = auth;
  const newArgs = {
    ...args,
    headers: {
      ...args.headers,
      'Compressed-Response': compress,
    },
    responseHandler: async (response) => {
      let decompressed;
      const responseType = response.headers.get('compressed-response');
      const log = {
        time: new Date().toISOString(),
        type: responseType,
        url: response.url,
      };
      let temp;
      switch (responseType) {
        case 'full':
          temp = Buffer.from(await response.arrayBuffer(), 'utf-8');
          log.sizeOrigin = calculateSize(temp);
          decompressed = decompress(temp, false);
          break;

        case 'hpack':
          temp = await response.json();
          log.sizeOrigin = calculateSize(temp);
          decompressed = unpack(temp, false, false);
          break;

        case 'gzip':
          temp = Buffer.from(await response.arrayBuffer(), 'utf-8');
          log.sizeOrigin = calculateSize(temp);
          decompressed = JSON.parse(gunzip(temp), false);
          break;

        case 'none':
          temp = await response.json();
          log.sizeOrigin = calculateSize(temp);
          decompressed = temp;
          break;

        default:
          temp = await response.json();
          log.sizeOrigin = calculateSize(temp);
          decompressed = temp;
          break;
      }

      log.sizeAfter = calculateSize(decompressed);
      await dispatch({ type: 'log/add', payload: { ...log } });

      return decompressed;
    },
  };

  const result = await baseQuery(newArgs, api, extraOptions);
  if (!result.error) {
    return result;
  }

  const { status } = result.error;
  const isUnauthorized = (status === 401);

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
