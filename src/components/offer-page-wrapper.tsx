import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { OfferPage } from './offer-page';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchOfferData } from '../store/offers/thunks';
import { Spinner } from './spinner/spinner';

export function OfferPageWrapper(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.comments);
  const offer = useAppSelector((state) => state.offerDetails);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const offerNotFound = useAppSelector((state) => state.offerNotFound);
  const params = useParams<{ id: string }>();
  const id = params.id ?? '';

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferData(id));
    }
  }, [dispatch, id]);

  if (offerNotFound) {
    return <Navigate to="/404" replace />;
  }

  if (!offer) {
    return <Spinner />;
  }

  return (
    <OfferPage
      offerId={offer.key}
      isPremium={offer.isPremium}
      price={offer.price}
      isBookmark={offer.isBookmark}
      title={offer.title}
      placeCardType={offer.placeCardType}
      rating={offer.rating}
      reviews={reviews}
      nearbyOffers={nearbyOffers}
      authorizationStatus={authorizationStatus}
    />
  );
}
