import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity, CreateOfferDto } from './index.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findByOfferName(offerName: string): Promise<DocumentType<OfferEntity> | null>;
  findByOfferNameOrCreate(offerName: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>
}
