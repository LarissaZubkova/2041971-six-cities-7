import { Request } from 'express';

import { CreateUserDTO } from './dto/create-user.dto.js';
import { RequestBody, RequestParams } from '../../types/index.js';

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDTO>;
