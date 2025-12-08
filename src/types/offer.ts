export interface Offer {
  key: string;
  cityName: string;
  isPremium: boolean;
  image: string;
  price: number;
  isBookmark: boolean;
  title: string;
  placeCardType: string;
  rating: number;
  location: {
    latitude: number;
    longitude: number;
  };
}
