import React, { useMemo, useState } from 'react';
import { CITIES } from '../const';
import { CitiesList } from './cities-list';
import { useAppDispatch, useAppSelector } from '../hooks';
import { changeCity } from '../store/action';
import { Offer } from '../types/offer';
import { Offers } from './offers';
import { Map } from './map';
import { Spinner } from './spinner/spinner';
import { SortType, SortingOptions } from './sorting-options';

export type MainPageProps = {
    placeCount: number;
    offers: Offer[];
}

export function MainPage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.isLoading);

  const currentCity = useAppSelector((state) => state.cityName);
  const allOffers = useAppSelector((state) => state.offers);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState<SortType>('popular');

  const cityOffers = allOffers.filter((offer) => offer.cityName === currentCity);
  const placeCount = cityOffers.length;

  const sortedOffers = useMemo(() => {
    switch (currentSort) {
      case 'price-low-high':
        return [...cityOffers].sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return [...cityOffers].sort((a, b) => b.price - a.price);
      case 'top-rated-first':
        return [...cityOffers].sort((a, b) => b.rating - a.rating);
      default:
        return cityOffers;
    }
  }, [cityOffers, currentSort]);

  const handleCityChange = (city: string[number]) => {
    dispatch(changeCity(city));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41}/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">4</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={CITIES}
              currentCity={currentCity}
              onCityChange={handleCityChange}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placeCount} places to stay in {currentCity}</b>
              <SortingOptions currentSort={currentSort} onSortChange={setCurrentSort} />
              <Offers offers={sortedOffers} onOfferHover={setActiveOfferId} />
            </section>
            <div className="cities__right-section">
              <Map offers={cityOffers} activeOfferId={activeOfferId} />
            </div>
          </div>
        </div>
      </main>
    </div>);
}
