import React from 'react';

type CitiesListProps = {
  cities: readonly string[];
  currentCity: string;
  onCityChange: (city: string) => void;
};

export function CitiesList({
  cities,
  currentCity,
  onCityChange,
}: CitiesListProps): React.JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <a
            className={`locations__item-link tabs__item ${
              city === currentCity ? 'tabs__item--active' : ''
            }`}
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              onCityChange(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
