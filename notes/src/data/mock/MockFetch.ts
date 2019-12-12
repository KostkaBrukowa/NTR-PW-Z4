import { NoteModel } from '../models/NoteModel';

let notes = [
  new NoteModel('1', new Date(), 'test title1', false, 'some content', ['category1', 'category2']),
  new NoteModel('2', new Date(), 'test title2', false, 'some content', ['category1', 'category3']),
  new NoteModel('3', new Date(), 'test title3', false, 'some content', ['category1', 'category4']),
  new NoteModel('4', new Date(), 'test title4', false, 'some content', ['category1', 'category6'])
];

export function fetchAllNotes(): Promise<NoteModel[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(notes);
    }, 500);
  });
}

export function fetchNoteById(id: string | null): Promise<NoteModel> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(notes.find(value => value.id === id));
    }, 500);
  });
}

export function fetchRemoveNote(id: string | null): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      notes = notes.filter(value => value.id !== id);
      resolve();
    }, 500);
  });
}
