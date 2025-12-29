import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { postComment } from '../store/offers/thunks';

export type ReviewFormData = {
    rating: number;
    review: string;
};

type OfferReviewFormProps = {
  offerId: string;
};

export function OfferReviewForm({ offerId }: OfferReviewFormProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    review: '',
  });

  const onRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const onReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, review: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postComment(offerId, { comment: formData.review, rating: formData.rating }))
      .then(() => {
        setFormData({ rating: 0, review: '' });
      });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          onChange={onRatingChange}
          id="5-stars"
          type="radio"
          checked={formData.rating === 5}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          onChange={onRatingChange}
          id="4-stars"
          type="radio"
          checked={formData.rating === 4}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          onChange={onRatingChange}
          id="3-stars"
          type="radio"
          checked={formData.rating === 3}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          onChange={onRatingChange}
          id="2-stars"
          type="radio"
          checked={formData.rating === 2}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          onChange={onRatingChange}
          id="1-star"
          type="radio"
          checked={formData.rating === 1}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={formData.review} onChange={onReviewChange}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}
