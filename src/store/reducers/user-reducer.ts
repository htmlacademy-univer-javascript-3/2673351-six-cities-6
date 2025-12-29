import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/auth-info';
import { setAuthorizationStatus, setUserInfo } from '../action';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  info: AuthInfo | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  info: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.info = action.payload;
    });
});
