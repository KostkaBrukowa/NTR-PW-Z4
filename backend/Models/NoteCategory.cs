using System.ComponentModel.DataAnnotations.Schema;

namespace Z01.Models
{
  [Table("NoteCategory")]
  public class NoteCategory
  {
    [Column("IDNote")]
    public int NoteID { get; set; }
    public Note Note { get; set; }

    [Column("IDCategory")]
    public int CategoryID { get; set; }
    public Category Category { get; set; }
  }
}
