import React from 'react';
import { OfferCard } from './offer-card';
import { Offer } from '../types/offer';

export type OffersProps = {
    offers: Offer[];
    onOfferHover?: (offerId: string | null) => void;
    listClassName?: string;
};

const noop = () => {};

export const Offers = React.memo(({
  offers,
  onOfferHover = noop,
  listClassName = 'cities__places-list places__list tabs__content',
}: OffersProps): React.JSX.Element => (
  <div className={listClassName}>
    {
      offers.map((offer) => (
        <div
          key={offer.key}
          onMouseEnter={() => onOfferHover(offer.key)}
          onMouseLeave={() => onOfferHover(null)}
        >
          <OfferCard
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

Offers.displayName = 'Offers';
