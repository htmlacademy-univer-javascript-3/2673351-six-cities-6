import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { OfferPage } from './offer-page';
import { Offer } from '../mocks/offers';

type OfferPageWrapperProps = {
  offers: Offer[];
}

export function OfferPageWrapper({ offers }: OfferPageWrapperProps): React.JSX.Element {
  const params = useParams<{ id: string }>();
  const id = params.id ?? '';

  const offer = offers.find((o) => String(o.key) === id);
  
  if (!offer) {
    return <Navigate to="/" replace />;
  }

  return <OfferPage
    isPremium={offer.isPremium}
    price={offer.price}
    isBookmark={offer.isBookmark}
    title={offer.title}
    placeCardType={offer.placeCardType}
    rating={offer.rating}
  />;
}
