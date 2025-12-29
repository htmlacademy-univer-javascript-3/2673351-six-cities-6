import React, { useCallback } from 'react';
import { OfferCard } from './offer-card';
import { Offer } from '../types/offer';

export type OffersProps = {
    offers: Offer[];
    onOfferHover?: (offerId: string | null) => void;
    listClassName?: string;
};

type OfferCardItemProps = {
  offer: Offer;
  onOfferHover?: (offerId: string | null) => void;
};

const OfferCardItem = React.memo(({
  offer,
  onOfferHover,
}: OfferCardItemProps): React.JSX.Element => {
  const handleMouseEnter = useCallback(() => {
    onOfferHover?.(offer.key);
  }, [onOfferHover, offer.key]);

  const handleMouseLeave = useCallback(() => {
    onOfferHover?.(null);
  }, [onOfferHover]);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
  );
});

OfferCardItem.displayName = 'OfferCardItem';

export const Offers = React.memo(({
  offers,
  onOfferHover = () => {},
  listClassName = 'cities__places-list places__list tabs__content',
}: OffersProps): React.JSX.Element => (
  <div className={listClassName}>
    {
      offers.map((offer) => (
        <OfferCardItem
          key={offer.key}
          offer={offer}
          onOfferHover={onOfferHover}
        />
      ))
    }
  </div>
));

Offers.displayName = 'Offers';
