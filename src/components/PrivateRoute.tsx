import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;
  const isAuthed = authorizationStatus === AuthorizationStatus.Auth;
  return isAuthed ? children : <Navigate to="/login" />;
}
