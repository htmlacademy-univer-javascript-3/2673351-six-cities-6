import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../const';
import { useAppSelector } from '../hooks';
import { selectAuthorizationStatus } from '../store/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

export function PrivateRoute(props: PrivateRouteProps): JSX.Element | null {
  const { children } = props;
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isAuthed = authorizationStatus === AuthorizationStatus.Auth;

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  return isAuthed ? children : <Navigate to="/login" />;
}
