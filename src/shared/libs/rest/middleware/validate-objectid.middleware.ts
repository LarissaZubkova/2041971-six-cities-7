import { Request, Response, NextFunction } from 'express';
import { HttpErrors, Middleware } from '../index.js';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

export class ValidateObjectIdMiddleware implements Middleware {
  constructor(private param: string) {}

  public execute({ params }: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpErrors(
      StatusCodes.BAD_REQUEST,
      `${objectId} is invalid ObjectiID`,
      'ValidateObjectIdMiddleware'
    );
  }
}
