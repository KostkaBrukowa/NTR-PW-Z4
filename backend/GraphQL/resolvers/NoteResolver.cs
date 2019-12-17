using GraphQL.Types;
using Z01.Models;
using Z01.services;
using Z4.GraphQL.types;

namespace Z4.GraphQL.resolvers
{
    public class NoteResolver : ObjectGraphType
    {
        private NoteService _noteService;

        public NoteResolver(MyContext dbContext)
        {
            _noteService = new NoteService(dbContext);
            Name = "Query";

            Field<NoteType>(
                "note",
                arguments: new QueryArguments(new QueryArgument<IntGraphType> {Name = "id"}),
                resolve: context => _noteService.GetNoteById(context.GetArgument<int>("id")));

            Field<ListGraphType<NoteType>>(
                "notes",
                resolve: context => _noteService.GetAllNotes(new NoteFilterModel()).Item3);
        }
    }
}
