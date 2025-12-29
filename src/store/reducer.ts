import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { AuthorizationStatus } from '../const';
import { AuthInfo } from '../types/auth-info';
import {
  changeCity,
  loadComments,
  loadOffers,
  setAuthorizationStatus,
  setOffersLoading,
  setUserInfo,
} from './action';


export type OffersState = {
  cityName: string;
  offers: Offer[];
  isLoading: boolean;
  comments: Review[];
  authorizationStatus: AuthorizationStatus;
  userInfo: AuthInfo | null;
};

const initialState: OffersState = {
  cityName: 'Paris',
  offers: [],
  isLoading: false,
  comments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});
