import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';

export type OffersSliceState = {
  cityName: string;
  offers: Offer[];
  isLoading: boolean;
};

const initialState: OffersSliceState = {
  cityName: 'Paris',
  offers: [],
  isLoading: false,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.cityName = action.payload;
    },
    loadOffers(state, action: PayloadAction<Offer[]>) {
      state.offers = action.payload;
    },
    setOffersLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { changeCity, loadOffers, setOffersLoading } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
