import { Model } from '../models/Model';
import { FiltersModel } from './FiltersModel';

export class GlobalState extends Model<GlobalState> {
  public constructor(readonly filters: FiltersModel = new FiltersModel()) {
    super();
  }
}
