import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { OfferPage } from './offer-page';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchOfferData } from '../store/offers/thunks';
import { Spinner } from './spinner/spinner';
import {
  selectAuthorizationStatus,
  selectComments,
  selectNearbyOffers,
  selectOfferDetails,
  selectOfferNotFound,
} from '../store/selectors';

export function OfferPageWrapper(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(selectComments);
  const offer = useAppSelector(selectOfferDetails);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const offerNotFound = useAppSelector(selectOfferNotFound);
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
