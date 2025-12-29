import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './hooks';
import { logout } from './store/offers/thunks';

export const useLogout = (): (() => void) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useCallback(() => {
    dispatch(logout()).finally(() => {
      navigate('/login');
    });
  }, [dispatch, navigate]);
};
