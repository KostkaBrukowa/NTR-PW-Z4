export interface NoteDTO {
  id: string;
  creationDate: string;
  title: string;
  markdown: boolean;
  content: string;
  categories: string[];
}

export interface PaginatedNotesDTO {
  values: NoteDTO[];
  total: number;
}

export interface NoteRequestDTO {
  title: string;
  markdown: boolean;
  content: string;
  categories: string[];
}
