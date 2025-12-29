import { OfferCard } from './offer-card';
import { Offer } from '../types/offer';

export type OffersProps = {
    offers: Offer[];
    onOfferHover: (offerId: string | null) => void;
};

export function Offers({ offers, onOfferHover }: OffersProps): React.JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
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
  );
}
