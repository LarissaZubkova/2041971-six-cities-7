import { City, HousingType, Amenity } from '../../../types/offer.type.js';
import { IsArray, IsDateString, IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
    title: string;

    @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
    @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
      description: string;

    @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
      postDate?: Date;

    city: City;
    @MaxLength(256, { message: CreateOfferValidationMessage.previewImage.maxLength })
      previewImage: string;

    photos: string[];
    isPremium: boolean;
    isFavorite: boolean;
    rating: number;
    housingType: HousingType;
    rooms: number;
    guests: number;
    @IsInt({ message: CreateOfferValidationMessage.rentalCost.invalidFormat })
    @Min(100, { message: CreateOfferValidationMessage.rentalCost.minValue })
    @Max(200000, { message: CreateOfferValidationMessage.rentalCost.maxValue })
      rentalCost: number;

    @IsArray({ message: CreateOfferValidationMessage.amenities.invalidFormat })
      amenities: Amenity[];

    author: string;

    commentsCount: number;
    coordinates: {
          latitude: number;
          longitude: number;
      };
}
