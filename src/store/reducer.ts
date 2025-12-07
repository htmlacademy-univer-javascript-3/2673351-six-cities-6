import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../mocks/offers';
import { changeCity, loadOffers } from './action';


export type OffersState = {
  cityName: string;
  offers: Offer[];
};

const initialState: OffersState = {
  cityName: 'Paris',
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
