import { StatusCodes } from 'http-status-codes';
import { HttpErrors } from '../errors/http-errors.js';
import { Middleware } from './middleware.interface.js';
import { NextFunction, Request, Response } from 'express';

export class PrivateRouteMiddleware implements Middleware {
  public async execute({ tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    if(!tokenPayload) {
      throw new HttpErrors(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}
