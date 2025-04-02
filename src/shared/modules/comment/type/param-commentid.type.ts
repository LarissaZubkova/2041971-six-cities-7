import { ParamsDictionary } from 'express-serve-static-core';

export type ParamCommentId = {
  commentId: string;
} | ParamsDictionary;
