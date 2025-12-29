import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../const';
import { useAppSelector } from '../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
};

export function PrivateRoute(props: PrivateRouteProps): JSX.Element | null {
  const { children } = props;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isAuthed = authorizationStatus === AuthorizationStatus.Auth;

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  return isAuthed ? children : <Navigate to="/login" />;
}
