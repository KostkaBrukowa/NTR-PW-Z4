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
                "newNote",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<NoteInputType>> {Name = "input"}),
                resolve: context => noteService.SaveNote(context.GetArgument<Note>("input")));

            Field<NonNullGraphType<BooleanGraphType>>(
                "updateNote",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<NoteUpdateInputType>>
                    {Name = "input"}),
                resolve: context => noteService.SaveNote(context.GetArgument<Note>("input")));

            Field<NonNullGraphType<BooleanGraphType>>(
                "deleteNote",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> {Name = "id"}),
                resolve: context => noteService.RemoveNote(context.GetArgument<int>("id"), null));
        }
    }
}
