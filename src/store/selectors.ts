import { createSelector } from '@reduxjs/toolkit';
import { State } from './index';

export const selectCityName = (state: State) => state.city.name;
export const selectOffers = (state: State) => state.offers.items;
export const selectOffersLoading = (state: State) => state.offers.isLoading;
export const selectReviews = (state: State) => state.comments.items;
export const selectAuthorizationStatus = (state: State) => state.user.authorizationStatus;
export const selectUserInfo = (state: State) => state.user.info;

export const selectCityOffers = createSelector(
  [selectOffers, selectCityName],
  (offers, cityName) => offers.filter((offer) => offer.cityName === cityName)
);

export const selectFavoriteOffers = createSelector(
  [selectOffers],
  (offers) => offers.filter((offer) => offer.isBookmark)
);

export const selectFavoritesCount = createSelector(
  [selectFavoriteOffers],
  (favorites) => favorites.length
);

export const makeSelectOfferById = () =>
  createSelector(
    [selectOffers, (_state: State, offerId: string) => offerId],
    (offers, offerId) => offers.find((offer) => offer.key === offerId) ?? null
  );

export const makeSelectNearbyOffers = () =>
  createSelector(
    [selectOffers, (_state: State, offerId: string | null) => offerId],
    (offers, offerId) =>
      offerId ? offers.filter((offer) => offer.key !== offerId).slice(0, 3) : []
  );
