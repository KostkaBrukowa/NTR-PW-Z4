using System.Linq;
using GraphQL.Types;
using Z01.Models;
using Z01.services;

namespace Z4.GraphQL.types
{
    public class NoteFiltersType : InputObjectGraphType
    {
        public NoteFiltersType()
        {
            Name = "NoteFilters";

            Field<DateGraphType>("dateFrom");
            Field<DateGraphType>("dateTo");
            Field<StringGraphType>("category");
            Field<IntGraphType>("page");
            Field<IntGraphType>("pageSize");
        }
    }
}
