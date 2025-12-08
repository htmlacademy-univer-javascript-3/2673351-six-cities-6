import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../store';
import { Action } from 'redux';

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  State,
  AxiosInstance,
  Action<string>
>;

export type AppThunkDispatch = ThunkDispatch<State, AxiosInstance, Action<string>>;
