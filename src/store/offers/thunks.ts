import { AxiosInstance } from 'axios';
import { ThunkActionResult } from '../../types/thunk';
import { loadComments, loadOffers, setOffersLoading } from '../action';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';

const OFFERS_URL = '/offers';
const COMMENTS_URL = '/comments';

type Location = {
    latitude: number;
    longitude: number;
    zoom: number;
};

type ResponseOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: number;
  isFavorite: boolean;
  isPremium: boolean;
  previewImage: string;
  city: {
    name: string;
    location: Location;
  };
  location: Location;
};

type ResponseComment = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
};

function mapOffer(offer: ResponseOffer): Offer {
  return {
    key: offer.id,
    title: offer.title,
    cityName: offer.city.name,
    placeCardType: offer.type,
    price: offer.price,
    rating: offer.rating,
    isPremium: offer.isPremium,
    isBookmark: offer.isFavorite,
    image: offer.previewImage,
    location: {
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
    },
  };
}

export const fetchOffers = (): ThunkActionResult =>
  async (dispatch, _getState, api: AxiosInstance) => {
    dispatch(setOffersLoading(true));
    try {
      const { data } = await api.get<ResponseOffer[]>(OFFERS_URL);
      dispatch(loadOffers(data.map(mapOffer)));
    } finally {
      dispatch(setOffersLoading(false));
    }
  };

const formatReviewDate = (date: string): string =>
  new Date(date).toLocaleString('en-US', { month: 'long', year: 'numeric' });

const mapComment = (comment: ResponseComment): Review => ({
  id: comment.id,
  userName: comment.user.name,
  avatarUrl: comment.user.avatarUrl,
  rating: comment.rating,
  comment: comment.comment,
  date: formatReviewDate(comment.date),
  dateTime: comment.date,
});

export const fetchComments = (offerId: string): ThunkActionResult =>
  async (dispatch, _getState, api: AxiosInstance) => {
    dispatch(loadComments([]));
    const { data } = await api.get<ResponseComment[]>(`${COMMENTS_URL}/${offerId}`);
    dispatch(loadComments(data.map(mapComment)));
  };
