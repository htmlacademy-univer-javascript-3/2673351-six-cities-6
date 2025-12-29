import React from 'react';
import { Offer } from '../types/offer';
import { OfferCard } from './offer-card';

type NearbyOfferCardProps = {
  offer: Offer;
};

export const NearbyOfferCard = React.memo(({ offer }: NearbyOfferCardProps): React.JSX.Element => (
  <OfferCard
    id={offer.key}
    isPremium={offer.isPremium}
    image={offer.image}
    price={offer.price}
    isBookmark={offer.isBookmark}
    title={offer.title}
    placeCardType={offer.placeCardType}
    rating={offer.rating}
    cardClassName="near-places__card"
    imageWrapperClassName="near-places__image-wrapper"
  />
));

NearbyOfferCard.displayName = 'NearbyOfferCard';
