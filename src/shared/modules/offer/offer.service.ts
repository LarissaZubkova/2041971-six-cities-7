import { inject } from 'inversify';
import { CreateOfferDto, OfferEntity, OfferService } from './index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { types } from '@typegoose/typegoose';

export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<types.DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public findByOfferId(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findOne({ offerId: offerId }).exec();
  }

  public async findByOfferName(offerName: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findOne({ name: offerName }).exec();
  }

  public async findByOfferNameOrCreate(offerName: string, dto: CreateOfferDto): Promise<types.DocumentType<OfferEntity>> {
    const existedOffer = await this.findByOfferName(offerName);

    if (existedOffer) {
      return existedOffer;
    }

    return this.create(dto);
  }
}
