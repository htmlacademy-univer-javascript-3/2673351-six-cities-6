import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { changeCity, loadComments, loadOffers, setOffersLoading } from './action';


export type OffersState = {
  cityName: string;
  offers: Offer[];
  isLoading: boolean;
  comments: Review[];
};

const initialState: OffersState = {
  cityName: 'Paris',
  offers: [],
  isLoading: false,
  comments: [],
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
    });
});
