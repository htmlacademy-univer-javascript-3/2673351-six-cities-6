import React from 'react';
import { Link } from 'react-router-dom';

type PlaceCardProps = {
  id: number;
  isPremium: boolean;
  image: string;
  price: number;
  isBookmark: boolean;
  title: string;
  placeCardType: string;
  rating: number;
}

export function OfferCard({id, isPremium, image, price, isBookmark, title, placeCardType, rating} : PlaceCardProps): React.JSX.Element {
  return (
    <article className="cities__card place-card">
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        :
        null}
      <div className="cities__image-wrapper place-card__image-wrapper">
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
          <button className={`place-card__bookmark-button ${isBookmark ? 'place-card__bookmark-button--active' : ''} button`} type="button">
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
    </article>);
}
