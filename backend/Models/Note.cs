using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Z01.Models
{
    [Table("Note")]
    public class Note
    {
        private string _rowVersionString;
        [Column("IDNote")] public int? NoteID { get; set; }
        [Column("Date")] public DateTime NoteDate { get; set; } = DateTime.Now;
        [Column("IsMarkdown")] public bool Markdown { get; set; }

        [Required]
        [MinLength(1), MaxLength(32)]
        public string Title { get; set; }

        [MinLength(1)] public string Description { get; set; }
        [Column("Timestamp")] [Timestamp] public byte[] RowVersion { get; set; }
        public List<NoteCategory> NoteCategories { get; set; }

        [NotMapped]
        public string RowVersionString
        {
            get => RowVersion != null ? Convert.ToBase64String(RowVersion) : _rowVersionString;
            set => _rowVersionString = value;
        }
        [NotMapped] public string[] Categories { get; set; }
    }
}
