import { combineReducers } from '@reduxjs/toolkit';
import { cityReducer } from './reducers/city-reducer';
import { offersReducer } from './reducers/offers-reducer';
import { commentsReducer } from './reducers/comments-reducer';
import { userReducer } from './reducers/user-reducer';

export const reducer = combineReducers({
  city: cityReducer,
  offers: offersReducer,
  comments: commentsReducer,
  user: userReducer,
});
