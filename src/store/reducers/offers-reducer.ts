import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { loadOffers, setOffersLoading } from '../action';

export type OffersState = {
  items: Offer[];
  isLoading: boolean;
};

const initialState: OffersState = {
  items: [],
  isLoading: false,
};

export const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.items = action.payload;
    })
    .addCase(setOffersLoading, (state, action) => {
      state.isLoading = action.payload;
    });
});
