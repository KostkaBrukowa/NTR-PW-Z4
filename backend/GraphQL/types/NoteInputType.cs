using System.Linq;
using GraphQL.Types;
using Z01.Models;
using Z01.services;

namespace Z4.GraphQL.types
{
    public class NoteInputType : InputObjectGraphType
    {
        public NoteInputType()
        {
            Name = "NoteInput";

            Field<NonNullGraphType<StringGraphType>>("title");
            Field<NonNullGraphType<StringGraphType>>("description");
            Field<BooleanGraphType>("markdown");
            Field<NonNullGraphType<ListGraphType<NonNullGraphType<StringGraphType>>>>("categories");
        }
    }
}
