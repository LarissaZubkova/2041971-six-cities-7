import { inject, injectable } from 'inversify';
import { BaseController, HttpErrors, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Request, Response } from 'express';
import { CreateOfferDto, OfferRdo, OfferService } from './index.js';
import { fillDTO } from '../../helpers/common.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {

    const existOffer = await this.offerService.findByOfferName(body.title);

    if(existOffer) {
      throw new HttpErrors(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with name «${body.title}» exists.`,
        'OfferController'
      );
    }

    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }
}
