import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { MainPage } from './main-page';
import { LoginPage } from './login-page';
import { FavoritesPage } from './favorites-page';
import { OfferPageWrapper } from './offer-page-wrapper';
import { PrivateRoute } from './private-route';
import { NotFoundPage } from './not-found-page';
import { useAppSelector } from '../hooks';
import { selectFavoriteOffers } from '../store/selectors';

export function App(): React.JSX.Element {
  const favorites = useAppSelector(selectFavoriteOffers);
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
            <PrivateRoute>
              <FavoritesPage favorites={favorites}/>
            </PrivateRoute>
          }
        />
        <Route
          path="/offer/:id"
          element={<OfferPageWrapper />}
        />
        <Route
          path="*"
          element={<NotFoundPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}
