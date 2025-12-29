import { createReducer } from '@reduxjs/toolkit';
import { changeCity } from '../action';

export type CityState = {
  name: string;
};

const initialState: CityState = {
  name: 'Paris',
};

export const cityReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.name = action.payload;
  });
});
