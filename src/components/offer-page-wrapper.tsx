import React, { useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { OfferPage } from './offer-page';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchComments } from '../store/offers/thunks';
import { makeSelectNearbyOffers, makeSelectOfferById, selectReviews } from '../store/selectors';

export function OfferPageWrapper(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(selectReviews);
  const params = useParams<{ id: string }>();
  const id = params.id ?? '';

  const selectOfferById = useMemo(makeSelectOfferById, []);
  const selectNearbyOffers = useMemo(makeSelectNearbyOffers, []);

  const offer = useAppSelector((state) => selectOfferById(state, id));
  const offerKey = offer?.key ?? null;
  const nearbyOffers = useAppSelector((state) => selectNearbyOffers(state, offerKey));

  useEffect(() => {
    if (offerKey) {
      dispatch(fetchComments(offerKey));
    }
  }, [dispatch, offerKey]);

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
