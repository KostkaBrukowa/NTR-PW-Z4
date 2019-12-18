using GraphQL.Types;
using Z01.Models;
using Z01.services;
using Z4.GraphQL.types;

namespace Z4.GraphQL.resolvers
{
    public class NoteQuery : ObjectGraphType
    {
        private NoteService _noteService;

        public NoteQuery(MyContext dbContext)
        {
            _noteService = new NoteService(dbContext);
            Name = "Query";

            Field<NoteType>(
                "note",
                arguments: new QueryArguments(new QueryArgument<IntGraphType> {Name = "id"}),
                resolve: context => _noteService.GetNoteById(context.GetArgument<int>("id")));

            Field<ListGraphType<NoteType>>(
                "notes",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<NoteFiltersType>> {Name = "noteFilters"}
                ),
                resolve: context => _noteService.GetAllNotes(context.GetArgument<NoteFilterModel>("noteFilters")).Item3);

            Field<ListGraphType<StringGraphType>>(
                "categories",
                resolve: context => _noteService.GetAllCategories());
        }
    }
}
