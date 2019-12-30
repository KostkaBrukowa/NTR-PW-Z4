import { Model } from '../models/Model';
import { FiltersModel } from './FiltersModel';
import { ErrorModel } from './ErrorModel';

export class GlobalState extends Model<GlobalState> {
  public constructor(readonly filters: FiltersModel = new FiltersModel(), readonly error: ErrorModel | null = null) {
    super();
  }
}
