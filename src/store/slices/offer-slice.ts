import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';

export type OfferSliceState = {
  comments: Review[];
  offerDetails: Offer | null;
  nearbyOffers: Offer[];
  offerNotFound: boolean;
};

const initialState: OfferSliceState = {
  comments: [],
  offerDetails: null,
  nearbyOffers: [],
  offerNotFound: false,
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    loadComments(state, action: PayloadAction<Review[]>) {
      state.comments = action.payload;
    },
    setOfferDetails(state, action: PayloadAction<Offer | null>) {
      state.offerDetails = action.payload;
    },
    setNearbyOffers(state, action: PayloadAction<Offer[]>) {
      state.nearbyOffers = action.payload;
    },
    setOfferNotFound(state, action: PayloadAction<boolean>) {
      state.offerNotFound = action.payload;
    },
  },
});

export const { loadComments, setOfferDetails, setNearbyOffers, setOfferNotFound } =
  offerSlice.actions;
export const offerReducer = offerSlice.reducer;
