import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus } from './const';
import { useAppDispatch, useAppSelector } from './hooks';
import { toggleFavoriteStatus } from './store/offers/thunks';
import { selectAuthorizationStatus } from './store/selectors';

export const useFavoriteToggle = (
  offerId: string,
  isFavorite: boolean
): (() => void) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  return useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }
    dispatch(toggleFavoriteStatus(offerId, isFavorite));
  }, [authorizationStatus, dispatch, isFavorite, navigate, offerId]);
};
