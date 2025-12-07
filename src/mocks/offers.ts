export interface Offer {
  key: number;
  cityName: string;
  isPremium: boolean;
  image: string;
  price: number;
  isBookmark: boolean;
  title: string;
  placeCardType: string;
  rating: number;
}

export const offers: Offer[] = [
  {
    key: 1,
    cityName: 'Amsterdam',
    isPremium: true,
    image: 'markup/img/apartment-01.jpg',
    price: 120,
    isBookmark: true,
    title: 'Beautiful & luxurious apartment at great location',
    placeCardType: 'Apartment',
    rating: 5
  },
  {
    key: 2,
    cityName: 'Amsterdam',
    isPremium: false,
    image: 'markup/img/room.jpg',
    price: 80,
    isBookmark: true,
    title: 'Wood and stone place',
    placeCardType: 'Room',
    rating: 4
  },
//   {
//     key: 3,
//     cityName: 'Amsterdam',
//     isPremium: false,
//     image: 'markup/img/apartment-02.jpg',
//     price: 132,
//     isBookmark: false,
//     title: 'Canal View Prinsengracht',
//     placeCardType: 'Apartment',
//     rating: 4
//   },
//   {
//     key: 4,
//     cityName: 'Amsterdam',
//     isPremium: true,
//     image: 'markup/img/apartment-03.jpg',
//     price: 180,
//     isBookmark: false,
//     title: 'Nice, cozy, warm big bed apartment',
//     placeCardType: 'Apartment',
//     rating: 5
//   },
//   {
//     key: 5,
//     isPremium: false,
//     image: 'markup/img/room.jpg',
//     price: 80,
//     isBookmark: true,
//     title: 'Wood and stone place',
//     placeCardType: 'Room',
//     rating: 4
//   }
];
