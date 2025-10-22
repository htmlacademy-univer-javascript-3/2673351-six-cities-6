import {OfferCard} from './offer-card';
import { Offer } from '../mocks/offers';
import { useState } from 'react';

export type OffersProps = {
    offers: Offer[];
}

export function Offers({offers}: OffersProps): React.JSX.Element {
  const [, setActiveOffer] = useState(0);
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <div
            key={offer.key}
            onMouseEnter={() => setActiveOffer(offer.key)}
            onMouseLeave={() => setActiveOffer(0)}
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
