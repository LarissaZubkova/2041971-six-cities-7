import { HttpErrors } from '../../../libs/rest/index.js';

export class BaseUserException extends HttpErrors {
  constructor(httpStatusCode: number, message: string) {
    super(httpStatusCode, message);
  }
}
