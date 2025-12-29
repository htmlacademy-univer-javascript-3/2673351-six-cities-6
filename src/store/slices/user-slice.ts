import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/auth-info';

export type UserSliceState = {
  authorizationStatus: AuthorizationStatus;
  userInfo: AuthInfo | null;
};

const initialState: UserSliceState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    setUserInfo(state, action: PayloadAction<AuthInfo | null>) {
      state.userInfo = action.payload;
    },
  },
});

export const { setAuthorizationStatus, setUserInfo } = userSlice.actions;
export const userReducer = userSlice.reducer;
