using System.Linq;
using GraphQL.Types;
using Z01.Models;
using Z01.services;

namespace Z4.GraphQL.types
{
    public class NoteType : ObjectGraphType<Note>
    {
        public NoteType()
        {
            Name = "Note";

            Field(x => x.NoteID, type: typeof(NonNullGraphType<IdGraphType>)).Description("Note id");
            Field(x => x.Title).Description("Title of the note");
            Field(x => x.Description).Description("Description of note");
            Field(x => x.Markdown).Description("Markdown was selected");
            Field(x => x.NoteDate).Description("Markdown was selected");
            Field(x => x.RowVersionString).Description("Row version converted to string");
            Field("categories", x => x.NoteCategories.Select(_ => _.Category.Name),
                    type: typeof(NonNullGraphType<ListGraphType<NonNullGraphType<StringGraphType>>>))
                .Description("Note categories");
        }
    }
}
