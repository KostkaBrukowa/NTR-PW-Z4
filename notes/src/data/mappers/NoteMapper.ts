import { NoteDTO, NoteRequestDTO } from '../contracts/NoteContract';
import { NoteModel } from '../models/NoteModel';

export function fromResponse(noteDTO: NoteDTO): NoteModel {
  if (!noteDTO) {
    return new NoteModel();
  }

  const { categories, content, creationDate, id, markdown, title } = noteDTO;

  return new NoteModel(id, new Date(creationDate), title, markdown, content, categories);
}

export function toResponse(note: NoteModel): NoteRequestDTO {
  const { id, categories, content, title, markdown } = note;
  return {
    id,
    title,
    markdown,
    content,
    categories
  };
}
