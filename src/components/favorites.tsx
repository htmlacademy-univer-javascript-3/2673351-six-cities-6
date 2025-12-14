import {FavoritesCard} from './favorites-card';
import { Offer } from '../types/offer';
import { useState } from 'react';

export type FavoritesProps = {
    favorites: Offer[];
}

export function Favorites({favorites}: FavoritesProps): React.JSX.Element {
  const [, setActiveOffer] = useState<string | null>(null);
  return (
    <div className="favorites__places">
      {
        favorites.map((offer) => (
          <div
            key={offer.key}
            onMouseEnter={() => setActiveOffer(offer.key)}
            onMouseLeave={() => setActiveOffer(null)}
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
