import React from 'react';
import { Review } from '../types/review';

type ReviewItemProps = {
  review: Review;
};

export const ReviewItem = React.memo(({ review }: ReviewItemProps): React.JSX.Element => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={review.avatarUrl} width={54} height={54} alt="Reviews avatar"/>
      </div>
      <span className="reviews__user-name">
        {review.userName}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: `calc(100% / 5 * ${review.rating})`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {review.comment}
      </p>
      <time className="reviews__time" dateTime={review.dateTime}>{review.date}</time>
    </div>
  </li>
));

ReviewItem.displayName = 'ReviewItem';
