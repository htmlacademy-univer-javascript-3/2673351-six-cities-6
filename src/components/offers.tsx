import {OfferCard} from './offer-card';
import { Offer } from '../types/offer';
import { useState } from 'react';

export type OffersProps = {
    offers: Offer[];
}

export function Offers({offers}: OffersProps): React.JSX.Element {
  const [, setActiveOffer] = useState<string | null>(null);
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <div
            key={offer.key}
            onMouseEnter={() => setActiveOffer(offer.key)}
            onMouseLeave={() => setActiveOffer(null)}
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
  );
}
