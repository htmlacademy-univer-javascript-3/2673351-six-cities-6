import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { AuthInfo } from '../types/auth-info';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction<string>('city/changeCity');
export const loadOffers = createAction<Offer[]>('offers/loadOffers');
export const setOffersLoading = createAction<boolean>('offers/setOffersLoading');
export const loadComments = createAction<Review[]>('comments/loadComments');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');
export const setUserInfo = createAction<AuthInfo | null>('user/setUserInfo');
