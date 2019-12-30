import { Model } from '../models/Model';

export enum ErrorType {
  NETWORK = 'NETWORK',
  USER = 'USER'
}

export class ErrorModel extends Model<ErrorModel> {
  constructor(readonly message: string, readonly type: ErrorType) {
    super();
  }
}
