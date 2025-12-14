import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { MainPage } from './main-page';
import { LoginPage } from './login-page';
import { FavoritesPage } from './favorites-page';
import { OfferPageWrapper } from './offer-page-wrapper';
import { PrivateRoute } from './private-route';
import { NotFoundPage } from './not-found-page';
import { AuthorizationStatus } from '../const';
import { useAppSelector } from '../hooks';

export function App(): React.JSX.Element {
  const offers = useAppSelector((state) => state.offers) ;
  const favorites = offers.filter((offer) => offer.isBookmark);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage/>}
        />
        <Route
          path="/login"
          element={<LoginPage/>}
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage favorites={favorites}/>
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
