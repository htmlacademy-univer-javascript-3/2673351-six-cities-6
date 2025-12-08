import { configureStore } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { createAPI } from '../services/api';
import { reducer } from './reducer';

export const api: AxiosInstance = createAPI();

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Extra = typeof api;
