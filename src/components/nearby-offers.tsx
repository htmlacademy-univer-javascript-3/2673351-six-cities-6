import React from 'react';
import { Offer } from '../types/offer';
import { NearbyOfferCard } from './nearby-offer-card';

type NearbyOffersProps = {
  offers: Offer[];
};

export function NearbyOffers({ offers }: NearbyOffersProps): React.JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <NearbyOfferCard key={offer.key} offer={offer} />
      ))}
    </div>
  );
}
