import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { OfferPage } from './offer-page';
import { Offer } from '../types/offer';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchComments } from '../store/offers/thunks';

type OfferPageWrapperProps = {
  offers: Offer[];
}

export function OfferPageWrapper({ offers }: OfferPageWrapperProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.comments);
  const params = useParams<{ id: string }>();
  const id = params.id ?? '';

  const offer = offers.find((o) => String(o.key) === id);
  const nearbyOffers = offers.filter((item) => item.key !== offer?.key).slice(0, 3);

  useEffect(() => {
    if (offer) {
      dispatch(fetchComments(offer.key));
    }
  }, [dispatch, offer]);

  if (!offer) {
    return <Navigate to="/" replace />;
  }

  return (
    <OfferPage
      isPremium={offer.isPremium}
      price={offer.price}
      isBookmark={offer.isBookmark}
      title={offer.title}
      placeCardType={offer.placeCardType}
      rating={offer.rating}
      reviews={reviews}
      nearbyOffers={nearbyOffers}
    />
  );
}
