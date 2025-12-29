import { AxiosError, AxiosInstance } from 'axios';
import { ThunkActionResult } from '../../types/thunk';
import {
  loadComments,
  loadOffers,
  setAuthorizationStatus,
  setNearbyOffers,
  setOfferDetails,
  setOfferNotFound,
  setOffersLoading,
  setFavorites,
  setUserInfo,
  updateOfferDetails,
  updateOffersOffer,
} from '../action';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { AuthInfo } from '../../types/auth-info';
import { AuthorizationStatus } from '../../const';
import { saveToken } from '../../services/token';

const OFFERS_URL = '/offers';
const COMMENTS_URL = '/comments';
const LOGIN_URL = '/login';
const FAVORITES_URL = '/favorite';
const NOT_FOUND_STATUS = 404;

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

export const fetchFavorites = (): ThunkActionResult =>
  async (dispatch, _getState, api: AxiosInstance) => {
    const { data } = await api.get<ResponseOffer[]>(FAVORITES_URL);
    dispatch(setFavorites(data.map(mapOffer)));
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

export const fetchOfferDetails = (offerId: string): ThunkActionResult =>
  async (dispatch, _getState, api: AxiosInstance) => {
    dispatch(setOfferNotFound(false));
    try {
      const { data } = await api.get<ResponseOffer>(`${OFFERS_URL}/${offerId}`);
      dispatch(setOfferDetails(mapOffer(data)));
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === NOT_FOUND_STATUS) {
        dispatch(setOfferNotFound(true));
      }
      dispatch(setOfferDetails(null));
    }
  };

export const fetchNearbyOffers = (offerId: string): ThunkActionResult =>
  async (dispatch, _getState, api: AxiosInstance) => {
    const { data } = await api.get<ResponseOffer[]>(`${OFFERS_URL}/${offerId}/nearby`);
    dispatch(setNearbyOffers(data.map(mapOffer)));
  };

type PostCommentData = {
  comment: string;
  rating: number;
};

export const postComment = (
  offerId: string,
  { comment, rating }: PostCommentData
): ThunkActionResult =>
  async (dispatch, getState, api: AxiosInstance) => {
    const { data } = await api.post<ResponseComment>(`${COMMENTS_URL}/${offerId}`, {
      comment,
      rating,
    });
    const nextComments = [...getState().offer.comments, mapComment(data)];
    dispatch(loadComments(nextComments));
  };

type FavoriteStatus = 0 | 1;

export const toggleFavoriteStatus = (
  offerId: string,
  isFavorite: boolean
): ThunkActionResult =>
  async (dispatch, _getState, api: AxiosInstance) => {
    const status: FavoriteStatus = isFavorite ? 0 : 1;
    const { data } = await api.post<ResponseOffer>(
      `${FAVORITES_URL}/${offerId}/${status}`
    );
    const mappedOffer = mapOffer(data);
    dispatch(updateOffersOffer(mappedOffer));
    dispatch(updateOfferDetails(mappedOffer));
  };

export const fetchOfferData = (offerId: string): ThunkActionResult =>
  async (dispatch, getState) => {
    await dispatch(fetchOfferDetails(offerId));
    if (getState().offer.offerNotFound) {
      return;
    }
    await Promise.all([
      dispatch(fetchNearbyOffers(offerId)),
      dispatch(fetchComments(offerId)),
    ]);
  };

export const checkAuth = (): ThunkActionResult =>
  async (dispatch, _getState, api: AxiosInstance) => {
    try {
      const { data } = await api.get<AuthInfo>(LOGIN_URL);
      dispatch(setUserInfo(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      await dispatch(fetchFavorites());
    } catch {
      dispatch(setUserInfo(null));
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setFavorites([]));
    }
  };

export const login = ({ email, password }: LoginData): ThunkActionResult =>
  async (dispatch, _getState, api: AxiosInstance) => {
    const { data } = await api.post<AuthInfo>(LOGIN_URL, { email, password });
    saveToken(data.token);
    dispatch(setUserInfo(data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    await dispatch(fetchFavorites());
  };
