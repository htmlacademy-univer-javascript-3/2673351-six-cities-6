import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {MainPage, MainPageProps} from './MainPage';
import { LoginPage } from './LoginPage';
import { FavoritesPage } from './FavoritesPage';
import { OfferPage } from './OfferPage';
import {PrivateRoute} from './PrivateRoute';
import {NotFoundPage} from './NotFoundPage';
import {AuthorizationStatus} from '../const';

export function App({placeCount}: MainPageProps): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage placeCount={placeCount}/>}
        />
        <Route
          path="/login"
          element={<LoginPage/>}
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
        <Route
          path="/offer/:id"
          element={<OfferPage/>}
        />
        <Route
          path="*"
          element={<NotFoundPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}
