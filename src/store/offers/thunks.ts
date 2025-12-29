import { AxiosInstance } from 'axios';
import { ThunkActionResult } from '../../types/thunk';
import {
  loadComments,
  loadOffers,
  setAuthorizationStatus,
  setOffersLoading,
  setUserInfo,
} from '../action';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { AuthInfo } from '../../types/auth-info';
import { AuthorizationStatus } from '../../const';
import { saveToken } from '../../services/token';

const OFFERS_URL = '/offers';
const COMMENTS_URL = '/comments';
const LOGIN_URL = '/login';

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

type LoginData = {
  email: string;
  password: string;
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

export const checkAuth = (): ThunkActionResult =>
  async (dispatch, _getState, api: AxiosInstance) => {
    try {
      const { data } = await api.get<AuthInfo>(LOGIN_URL);
      dispatch(setUserInfo(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setUserInfo(null));
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  };

export const login = ({ email, password }: LoginData): ThunkActionResult =>
  async (dispatch, _getState, api: AxiosInstance) => {
    const { data } = await api.post<AuthInfo>(LOGIN_URL, { email, password });
    saveToken(data.token);
    dispatch(setUserInfo(data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  };
