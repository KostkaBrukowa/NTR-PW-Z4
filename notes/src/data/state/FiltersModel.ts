import { Model } from '../models/Model';
import { weekAgo } from '../../utils/Date';

export class FiltersModel extends Model<FiltersModel> {
  constructor(
    readonly page: number = 0,
    readonly pageSize: number = 5,
    readonly dateFrom: Date = weekAgo(),
    readonly dateTo: Date = new Date(),
    readonly category: string | null = null
  ) {
    super();
  }

  public clear(): FiltersModel {
    return new FiltersModel();
  }
}
