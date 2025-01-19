import { City, HousingType, Amenity } from '../../../types/offer.type.js';

export class CreateOfferDto {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  rooms: number;
  guests: number;
  rentalCost: number;
  amenities: Amenity[];
  author: string;
  commentsCount: number;
  coordinates: {
          latitude: number;
          longitude: number;
      };
}
