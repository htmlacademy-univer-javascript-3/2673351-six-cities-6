import { configureStore } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { createAPI } from '../services/api';
import { offerReducer } from './slices/offer-slice';
import { offersReducer } from './slices/offers-slice';
import { userReducer } from './slices/user-slice';

export const api: AxiosInstance = createAPI();

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    offer: offerReducer,
    user: userReducer,
  },
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
