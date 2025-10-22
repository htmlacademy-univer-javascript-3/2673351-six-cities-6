import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {MainPage, MainPageProps} from './main-page';
import { LoginPage } from './login-page';
import { FavoritesPage } from './favorites-page';
import { OfferPageWrapper } from './offer-page-wrapper';
import {PrivateRoute} from './private-route';
import {NotFoundPage} from './not-found-page';
import {AuthorizationStatus} from '../const';

export function App({placeCount, offers}: MainPageProps): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage placeCount={placeCount} offers={offers}/>}
        />
        <Route
          path="/login"
          element={<LoginPage/>}
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage favorites={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path="/offer/:id"
          element={<OfferPageWrapper offers={offers} />}
        />
        <Route
          path="*"
          element={<NotFoundPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}
