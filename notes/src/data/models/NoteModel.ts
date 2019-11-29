import { Model } from './Model';

class NoteModel extends Model<NoteModel> {
  constructor(
    readonly Id: number = 0,
    readonly CreationDate: Date = new Date(),
    readonly Title: string = '',
    readonly Markdown: boolean = false,
    readonly Content: string = '',
    readonly Categories: string[] = []
  ) {
    super();
  }
}
