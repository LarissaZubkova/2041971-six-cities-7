import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Amenity, City, HousingType } from '../../types/offer.type.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'categories',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public title: string;

  @prop({ required: true, trim: true })
  public description: string;

  @prop({ required: true, default: '' })
  public city: City;

  @prop({ required: true, default: '' })
  public previewImage: string;

  @prop({ required: true, default: [], type: [String] })
  public photos: string[];

  @prop({ required: true, default: false })
  public isPremium: boolean;

  @prop({ required: true, default: false })
  public isFavorite: boolean;

  @prop({ required: true, default: null })
  public rating: number;

  @prop({ required: true, default: '' })
  public housingType: HousingType;

  @prop({ required: true, default: null })
  public rooms: number;

  @prop({ required: true, default: null })
  public guests: number;

  @prop({ required: true, default: null })
  public rentalCost: number;

  @prop({ required: true, default: [], type: [String] })
  public amenities: Amenity[];

  @prop({ ref: UserEntity, required: true })
  public author: Ref<UserEntity>;

  @prop({ required: true, default: null })
  public commentsCount: number;

  @prop({ type: () => Object, required: true, default: { latitude: null, longitude: null } })
  public coordinates: {
    latitude: number;
    longitude: number;
  };
}

export const OfferModel = getModelForClass(OfferEntity);
