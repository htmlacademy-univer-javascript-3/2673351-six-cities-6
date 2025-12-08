import { AxiosInstance } from 'axios';
import { ThunkActionResult } from '../../types/thunk';
import { loadOffers, setOffersLoading } from '../action';
import { Offer } from '../../types/offer';

const OFFERS_URL = '/offers';

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
