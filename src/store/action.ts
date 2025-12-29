import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { Review } from '../types/review';

export const changeCity = createAction<string>('city/changeCity');
export const loadOffers = createAction<Offer[]>('offers/loadOffers');
export const setOffersLoading = createAction<boolean>('offers/setOffersLoading');
export const loadComments = createAction<Review[]>('comments/loadComments');
