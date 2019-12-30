using GraphQL.Types;

namespace Z4.GraphQL.types
{
    public class PaginatedQueryType<T, K> : ObjectGraphType where T : ObjectGraphType<K>
    {
        public PaginatedQueryType()
        {
            Name = "PaginatedResponse";
            
            Field<NonNullGraphType<IntGraphType>>("total");
            Field<NonNullGraphType<ListGraphType<NonNullGraphType<T>>>>("values");
        }
    }
}
