import { IsOptional, MinLength, MaxLength, IsDateString, IsString, IsInt, Max, Min, IsMongoId } from 'class-validator';
import { CreateUpdateOfferMessage } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10,{ message: CreateUpdateOfferMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: CreateUpdateOfferMessage.description.minLength })
  @MaxLength(1024, { message: CreateUpdateOfferMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: CreateUpdateOfferMessage.postDate.invalidFormat })
  public postDate?: Date;

  @IsOptional()
  @IsString({ message: CreateUpdateOfferMessage.previewImage.invalidFormat })
  @MaxLength(256, { message: CreateUpdateOfferMessage.previewImage.maxLength })
  public image?: string;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.rentalCost.invalidFormat })
  @Min(100, { message: CreateUpdateOfferMessage.rentalCost.min })
  @Max(20000, { message: CreateUpdateOfferMessage.rentalCost.max })
  public rentalCost?: number;

  @IsOptional()
  @IsMongoId({ each: true, message: CreateUpdateOfferMessage.amenities.invalidFormat })
  public amenities?: string[];
}
