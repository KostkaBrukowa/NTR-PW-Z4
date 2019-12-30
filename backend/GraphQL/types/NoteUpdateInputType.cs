using System.Linq;
using GraphQL.Types;
using Z01.Models;
using Z01.services;

namespace Z4.GraphQL.types
{
    public class NoteUpdateInputType : NoteInputType
    {
        public NoteUpdateInputType()
        {
            Name = "NoteUpdateInput";

            Field<NonNullGraphType<IdGraphType>>("noteID");
        }
    }
}
