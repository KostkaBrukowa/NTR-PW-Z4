using GraphQL.Types;
using Z01.Models;
using Z01.services;
using Z4.GraphQL.types;

namespace Z4.GraphQL.resolvers
{
    public class NoteMutation : ObjectGraphType
    {
        public NoteMutation(MyContext dbContext)
        {
            var noteService = new NoteService(dbContext);
            Name = "Mutation";

            Field<NonNullGraphType<BooleanGraphType>>(
                "saveNote",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<NoteInputType>> {Name = "input"}),
                resolve: context => noteService.SaveNote(context.GetArgument<Note>("input")));

            Field<NonNullGraphType<BooleanGraphType>>(
                "deleteNote",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> {Name = "id"},
                    new QueryArgument<NonNullGraphType<StringGraphType>> {Name = "rowVersion"}),
                resolve: context =>
                    noteService.RemoveNote(context.GetArgument<int>("id"), context.GetArgument<string>("rowVersion")));
        }
    }
}
