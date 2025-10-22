import {FavoritesCard} from './favorites-card';
import { Offer } from '../mocks/offers';
import { useState } from 'react';

export type FavoritesProps = {
    favorites: Offer[];
}

export function Favorites({favorites}: FavoritesProps): React.JSX.Element {
  const [, setActiveOffer] = useState(0);
  return (
    <div className="favorites__places">
      {
        favorites.map((offer) => (
          <div
            key={offer.key}
            onMouseEnter={() => setActiveOffer(offer.key)}
            onMouseLeave={() => setActiveOffer(0)}
          >
            <FavoritesCard
              key={offer.key}
              isPremium={offer.isPremium}
              image={offer.image}
              price={offer.price}
              isBookmark={offer.isBookmark}
              title={offer.title}
              placeCardType={offer.placeCardType}
              rating={offer.rating}
            />
          </div>
        ))
      }
    </div>
  );
}
