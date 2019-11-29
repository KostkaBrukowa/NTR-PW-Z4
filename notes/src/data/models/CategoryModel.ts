import { Model } from './Model';

class CategoryModel extends Model<CategoryModel> {
  constructor(readonly id: number, readonly title: string) {
    super();
  }
}
