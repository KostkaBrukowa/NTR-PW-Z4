import { Model } from './Model';

export class NoteModel extends Model<NoteModel> {
  constructor(
    readonly id: string | null = null,
    readonly creationDate: Date = new Date(),
    readonly title: string = '',
    readonly markdown: boolean = false,
    readonly content: string = '',
    readonly categories: string[] = []
  ) {
    super();
  }
}
