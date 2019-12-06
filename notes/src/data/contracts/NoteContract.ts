export interface NoteDTO {
  id: string;
  creationDate: string;
  title: string;
  markdown: boolean;
  content: string;
  categories: string[];
}

export interface NoteRequestDTO {
  title: string;
  markdown: boolean;
  content: string;
  categories: string[];
}
