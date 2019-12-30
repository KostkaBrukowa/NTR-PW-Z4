using System;
using System.Linq;
using GraphQL.Types;
using Z01.Models;
using Z01.services;
using Z4.Controllers;
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
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> {Name = "id"}),
                resolve: context => _noteService.GetNoteById(context.GetArgument<int>("id")));

            Field<NonNullGraphType<PaginatedQueryType<NoteType, Note>>>(
                "notes",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<NoteFiltersType>> {Name = "noteFilters"}
                ),
                resolve: context =>
                {
                    var (total, values) = _noteService.GetAllNotes(context.GetArgument<NoteFilterModel>("noteFilters"));
                    return new PaginatedResponse<Note>
                    {
                        total = total,
                        values = values,
                    };
                });

            Field<NonNullGraphType<ListGraphType<NonNullGraphType<StringGraphType>>>>(
                "categories",
                resolve: context => _noteService.GetAllCategories().Select(_ => _.Name));
        }
    }
}
