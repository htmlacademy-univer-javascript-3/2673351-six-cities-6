import { createReducer } from '@reduxjs/toolkit';
import { Review } from '../../types/review';
import { loadComments } from '../action';

export type CommentsState = {
  items: Review[];
};

const initialState: CommentsState = {
  items: [],
};

export const commentsReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadComments, (state, action) => {
    state.items = action.payload;
  });
});
