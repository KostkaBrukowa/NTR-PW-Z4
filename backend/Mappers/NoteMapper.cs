using System;
using System.Linq;
using Z01.Models;
using Z4.dto;

namespace Z4.Mappers
{
    public class NoteMapper
    {
        public Note mapResponseToNote(NoteRequestDTO request)
        {
            return new Note
            {
                Description = request.Description,
                Markdown = request.Markdown,
                NoteID = request.NoteID ?? 0,
                Title = request.Title,
                RowVersion = request.RowVersion,
                NoteDate = DateTime.Now
            };
        }

        public NoteResponseDTO mapNoteToResponse(Note note)
        {
            return new NoteResponseDTO
            {
                Description = note.Description ?? "",
                Markdown = note.Markdown,
                NoteID = note.NoteID,
                Title = note.Title,
                RowVersion = note.RowVersion,
                NoteDate = note.NoteDate,
                Categories = note.NoteCategories.Select(_ => _.Category.Name)
            };
        }
    }
}
