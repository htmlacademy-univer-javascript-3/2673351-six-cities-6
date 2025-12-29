import { createSelector } from '@reduxjs/toolkit';
import { State } from './index';

export const selectOffersState = (state: State) => state.offers;
export const selectOfferState = (state: State) => state.offer;
export const selectUserState = (state: State) => state.user;

export const selectOffers = (state: State) => selectOffersState(state).offers;
export const selectFavorites = (state: State) => selectOffersState(state).favorites;
export const selectCityName = (state: State) => selectOffersState(state).cityName;
export const selectIsLoading = (state: State) => selectOffersState(state).isLoading;

export const selectComments = (state: State) => selectOfferState(state).comments;
export const selectOfferDetails = (state: State) => selectOfferState(state).offerDetails;
export const selectNearbyOffers = (state: State) => selectOfferState(state).nearbyOffers;
export const selectOfferNotFound = (state: State) => selectOfferState(state).offerNotFound;

export const selectAuthorizationStatus = (state: State) =>
  selectUserState(state).authorizationStatus;
export const selectUserInfo = (state: State) => selectUserState(state).userInfo;

export const selectCityOffers = createSelector(
  [selectOffers, selectCityName],
  (offers, cityName) => offers.filter((offer) => offer.cityName === cityName)
);

export const selectFavoritesCount = createSelector(
  [selectFavorites],
  (favorites) => favorites.length
);
