import React from 'react';
import { Link } from 'react-router-dom';
import { useFavoriteToggle } from '../use-favorite-toggle';

type PlaceCardProps = {
  id: string;
  isPremium: boolean;
  image: string;
  price: number;
  isBookmark: boolean;
  title: string;
  placeCardType: string;
  rating: number;
  cardClassName?: string;
  imageWrapperClassName?: string;
}

export const OfferCard = React.memo(({
  id,
  isPremium,
  image,
  price,
  isBookmark,
  title,
  placeCardType,
  rating,
  cardClassName = 'cities__card',
  imageWrapperClassName = 'cities__image-wrapper',
}: PlaceCardProps): React.JSX.Element => {
  const handleFavoriteClick = useFavoriteToggle(id, isBookmark);

  return (
    <article className={`${cardClassName} place-card`}>
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        :
        null}
      <div className={`${imageWrapperClassName} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={image} width={260} height={200} alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isBookmark ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isBookmark ? 'In' : 'To'} bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `calc(100% / 5 * ${rating})`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{placeCardType}</p>
      </div>
    </article>
  );
});

OfferCard.displayName = 'OfferCard';
