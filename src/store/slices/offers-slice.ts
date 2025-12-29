import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';

export type OffersSliceState = {
  cityName: string;
  offers: Offer[];
  favorites: Offer[];
  isLoading: boolean;
};

const initialState: OffersSliceState = {
  cityName: 'Paris',
  offers: [],
  favorites: [],
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
      state.favorites = action.payload.filter((offer) => offer.isBookmark);
    },
    setOffersLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setFavorites(state, action: PayloadAction<Offer[]>) {
      state.favorites = action.payload;
      if (state.offers.length > 0) {
        const favoritesById = new Map(
          action.payload.map((offer) => [offer.key, offer])
        );
        state.offers = state.offers.map((offer) =>
          favoritesById.get(offer.key) ?? { ...offer, isBookmark: false }
        );
      }
    },
    updateOffer(state, action: PayloadAction<Offer>) {
      const updatedOffer = action.payload;
      state.offers = state.offers.map((offer) =>
        offer.key === updatedOffer.key ? updatedOffer : offer
      );
      const favoriteIndex = state.favorites.findIndex(
        (offer) => offer.key === updatedOffer.key
      );
      if (updatedOffer.isBookmark) {
        if (favoriteIndex === -1) {
          state.favorites.push(updatedOffer);
        } else {
          state.favorites[favoriteIndex] = updatedOffer;
        }
      } else if (favoriteIndex !== -1) {
        state.favorites.splice(favoriteIndex, 1);
      }
    },
  },
});

export const {
  changeCity,
  loadOffers,
  setOffersLoading,
  setFavorites,
  updateOffer,
} = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
