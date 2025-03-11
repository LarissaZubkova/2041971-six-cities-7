import { Expose } from 'class-transformer';
import { City, HousingType, Amenity } from '../../../types/offer.type.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public photos: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public housingType: HousingType;

  @Expose()
  public rooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public rentalCost: number;

  @Expose()
  public amenities: Amenity[];

  @Expose()
  public author: string;

  @Expose()
  public commentsCount: number;

  @Expose()
  public coordinates: {
            latitude: number;
            longitude: number;
        };
}
