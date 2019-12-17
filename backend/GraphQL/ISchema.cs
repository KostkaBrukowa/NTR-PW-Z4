using GraphQL;
using GraphQL.Types;
using Z4.GraphQL.resolvers;

namespace Z4.GraphQL
{
    public class NoteSchema : Schema
    {
        public NoteSchema(IDependencyResolver resolver): base(resolver)
        {
            Query = resolver.Resolve<NoteResolver>();
//            Mutation = resolver.Resolve<NoteResolver>();
        }
    }}
