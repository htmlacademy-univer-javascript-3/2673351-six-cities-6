import React from 'react';
import { Offer } from '../types/offer';
import { NearbyOfferCard } from './nearby-offer-card';

type NearbyOffersProps = {
  offers: Offer[];
};

export const NearbyOffers = React.memo(({
  offers,
}: NearbyOffersProps): React.JSX.Element => (
  <div className="near-places__list places__list">
    {offers.map((offer) => (
      <NearbyOfferCard key={offer.key} offer={offer} />
    ))}
  </div>
));

NearbyOffers.displayName = 'NearbyOffers';
