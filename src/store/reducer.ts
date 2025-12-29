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
  setNearbyOffers,
  setOfferDetails,
  setOfferNotFound,
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
  offerDetails: Offer | null;
  nearbyOffers: Offer[];
  offerNotFound: boolean;
};

const initialState: OffersState = {
  cityName: 'Paris',
  offers: [],
  isLoading: false,
  comments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  offerDetails: null,
  nearbyOffers: [],
  offerNotFound: false,
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
    .addCase(setOfferDetails, (state, action) => {
      state.offerDetails = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setOfferNotFound, (state, action) => {
      state.offerNotFound = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});
