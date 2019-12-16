using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Z01.Models;

namespace Z4.dto
{
    public class NoteResponseDTO
    {
        public int NoteID { get; set; }
        public bool Markdown { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public byte[] RowVersion { get; set; }
        public DateTime NoteDate { get; set; }
        public IEnumerable<string> Categories { get; set; }
    }
}
