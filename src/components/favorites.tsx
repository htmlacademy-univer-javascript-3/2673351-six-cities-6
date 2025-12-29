import React from 'react';
import { FavoritesCard } from './favorites-card';
import { Offer } from '../types/offer';

export type FavoritesProps = {
    favorites: Offer[];
}

export const Favorites = React.memo(({ favorites }: FavoritesProps): React.JSX.Element => (
  <div className="favorites__places">
    {
      favorites.map((offer) => (
        <div
          key={offer.key}
        >
          <FavoritesCard
            id={offer.key}
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
));

Favorites.displayName = 'Favorites';
