import React from 'react';
import { Offer } from '../types/offer';
import { OfferCard } from './offer-card';

type NearbyOfferCardProps = {
  offer: Offer;
};

export function NearbyOfferCard({ offer }: NearbyOfferCardProps): React.JSX.Element {
  return (
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
  );
}
