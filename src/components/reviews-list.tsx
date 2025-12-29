import React from 'react';
import { Review } from '../types/review';
import { ReviewItem } from './review-item';

type ReviewsListProps = {
  reviews: Review[];
};

export const ReviewsList = React.memo(({
  reviews,
}: ReviewsListProps): React.JSX.Element => (
  <>
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  </>
));

ReviewsList.displayName = 'ReviewsList';
