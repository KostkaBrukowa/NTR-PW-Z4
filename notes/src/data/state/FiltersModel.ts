import { Model } from '../models/Model';
import { weekAgo } from '../../utils/Date';

export class FiltersModel extends Model<FiltersModel> {
  constructor(
    readonly page: number = 0,
    readonly pageSize: number = 9,
    readonly dateFrom: Date = weekAgo(),
    readonly dateTo: Date = new Date(),
    readonly category: string | null = null
  ) {
    super();
  }

  public clear(): FiltersModel {
    return new FiltersModel();
  }

  public toQueryParams(): string {
    const search = new URLSearchParams();
    search.append('page', this.page.toString());
    search.append('pageSize', this.pageSize.toString());
    search.append('dateFrom', this.dateFrom.toLocaleDateString());
    search.append('dateTo', this.dateTo.toLocaleDateString());
    if (this.category) {
      search.append('selectedCategory', this.category.toString());
    }

    return search.toString();
  }
}
