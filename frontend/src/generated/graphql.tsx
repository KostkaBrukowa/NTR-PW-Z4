import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a year, month and day in accordance with the
   * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a date and time. `DateTime` expects
   * timestamps to be formatted in accordance with the
   * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
   */
  DateTime: any;
  /**
   * The `DateTimeOffset` scalar type represents a date, time and offset from UTC.
   * `DateTimeOffset` expects timestamps to be formatted in accordance with the
   * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
   */
  DateTimeOffset: any;
  Decimal: any;
  /** The `Milliseconds` scalar type represents a period of time represented as the total number of milliseconds. */
  Milliseconds: any;
  /** The `Seconds` scalar type represents a period of time represented as the total number of seconds. */
  Seconds: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteNote: Scalars['Boolean'];
  saveNote: Scalars['Boolean'];
};

export type MutationDeleteNoteArgs = {
  id: Scalars['ID'];
  rowVersion: Scalars['String'];
};

export type MutationSaveNoteArgs = {
  input: NoteInput;
};

export type Note = {
  __typename?: 'Note';
  /** Note categories */
  categories: Array<Scalars['String']>;
  /** Description of note */
  description: Scalars['String'];
  /** Markdown was selected */
  markdown: Scalars['Boolean'];
  /** Markdown was selected */
  noteDate: Scalars['Date'];
  /** Note id */
  noteID: Scalars['ID'];
  /** Row version converted to string */
  rowVersionString: Scalars['String'];
  /** Title of the note */
  title: Scalars['String'];
};

export type NoteFilters = {
  dateFrom?: Maybe<Scalars['Date']>;
  dateTo?: Maybe<Scalars['Date']>;
  category?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export type NoteInput = {
  noteID?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
  description: Scalars['String'];
  markdown?: Maybe<Scalars['Boolean']>;
  categories: Array<Scalars['String']>;
  rowVersionString?: Maybe<Scalars['String']>;
};

export type PaginatedResponse = {
  __typename?: 'PaginatedResponse';
  total: Scalars['Int'];
  values: Array<Note>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Scalars['String']>;
  note?: Maybe<Note>;
  notes: PaginatedResponse;
};

export type QueryNoteArgs = {
  id: Scalars['ID'];
};

export type QueryNotesArgs = {
  noteFilters: NoteFilters;
};

export type FetchSingleNoteQueryVariables = {
  id: Scalars['ID'];
};

export type FetchSingleNoteQuery = { __typename?: 'Query' } & {
  note: Maybe<
    { __typename?: 'Note' } & Pick<
      Note,
      'noteID' | 'title' | 'description' | 'categories' | 'markdown' | 'rowVersionString'
    >
  >;
};

export type SaveNoteMutationVariables = {
  input: NoteInput;
};

export type SaveNoteMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'saveNote'>;

export type FetchAllCategoriesQueryVariables = {};

export type FetchAllCategoriesQuery = { __typename?: 'Query' } & Pick<Query, 'categories'>;

export type DeleteNoteMutationVariables = {
  id: Scalars['ID'];
  rowVersion: Scalars['String'];
};

export type DeleteNoteMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteNote'>;

export type FetchAllNotesQueryVariables = {
  filters: NoteFilters;
};

export type FetchAllNotesQuery = { __typename?: 'Query' } & {
  notes: { __typename?: 'PaginatedResponse' } & Pick<PaginatedResponse, 'total'> & {
      values: Array<
        { __typename?: 'Note' } & Pick<
          Note,
          'noteID' | 'title' | 'description' | 'noteDate' | 'markdown' | 'rowVersionString'
        >
      >;
    };
};

export const FetchSingleNoteDocument = gql`
  query FetchSingleNote($id: ID!) {
    note(id: $id) {
      noteID
      title
      description
      categories
      categories
      markdown
      rowVersionString
    }
  }
`;

/**
 * __useFetchSingleNoteQuery__
 *
 * To run a query within a React component, call `useFetchSingleNoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchSingleNoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchSingleNoteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchSingleNoteQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<FetchSingleNoteQuery, FetchSingleNoteQueryVariables>
) {
  return ApolloReactHooks.useQuery<FetchSingleNoteQuery, FetchSingleNoteQueryVariables>(
    FetchSingleNoteDocument,
    baseOptions
  );
}
export function useFetchSingleNoteLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FetchSingleNoteQuery, FetchSingleNoteQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<FetchSingleNoteQuery, FetchSingleNoteQueryVariables>(
    FetchSingleNoteDocument,
    baseOptions
  );
}
export type FetchSingleNoteQueryHookResult = ReturnType<typeof useFetchSingleNoteQuery>;
export type FetchSingleNoteLazyQueryHookResult = ReturnType<typeof useFetchSingleNoteLazyQuery>;
export type FetchSingleNoteQueryResult = ApolloReactCommon.QueryResult<
  FetchSingleNoteQuery,
  FetchSingleNoteQueryVariables
>;
export const SaveNoteDocument = gql`
  mutation SaveNote($input: NoteInput!) {
    saveNote(input: $input)
  }
`;
export type SaveNoteMutationFn = ApolloReactCommon.MutationFunction<SaveNoteMutation, SaveNoteMutationVariables>;

/**
 * __useSaveNoteMutation__
 *
 * To run a mutation, you first call `useSaveNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveNoteMutation, { data, loading, error }] = useSaveNoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveNoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SaveNoteMutation, SaveNoteMutationVariables>
) {
  return ApolloReactHooks.useMutation<SaveNoteMutation, SaveNoteMutationVariables>(SaveNoteDocument, baseOptions);
}
export type SaveNoteMutationHookResult = ReturnType<typeof useSaveNoteMutation>;
export type SaveNoteMutationResult = ApolloReactCommon.MutationResult<SaveNoteMutation>;
export type SaveNoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SaveNoteMutation,
  SaveNoteMutationVariables
>;
export const FetchAllCategoriesDocument = gql`
  query FetchAllCategories {
    categories
  }
`;

/**
 * __useFetchAllCategoriesQuery__
 *
 * To run a query within a React component, call `useFetchAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchAllCategoriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<FetchAllCategoriesQuery, FetchAllCategoriesQueryVariables>
) {
  return ApolloReactHooks.useQuery<FetchAllCategoriesQuery, FetchAllCategoriesQueryVariables>(
    FetchAllCategoriesDocument,
    baseOptions
  );
}
export function useFetchAllCategoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FetchAllCategoriesQuery, FetchAllCategoriesQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<FetchAllCategoriesQuery, FetchAllCategoriesQueryVariables>(
    FetchAllCategoriesDocument,
    baseOptions
  );
}
export type FetchAllCategoriesQueryHookResult = ReturnType<typeof useFetchAllCategoriesQuery>;
export type FetchAllCategoriesLazyQueryHookResult = ReturnType<typeof useFetchAllCategoriesLazyQuery>;
export type FetchAllCategoriesQueryResult = ApolloReactCommon.QueryResult<
  FetchAllCategoriesQuery,
  FetchAllCategoriesQueryVariables
>;
export const DeleteNoteDocument = gql`
  mutation DeleteNote($id: ID!, $rowVersion: String!) {
    deleteNote(id: $id, rowVersion: $rowVersion)
  }
`;
export type DeleteNoteMutationFn = ApolloReactCommon.MutationFunction<DeleteNoteMutation, DeleteNoteMutationVariables>;

/**
 * __useDeleteNoteMutation__
 *
 * To run a mutation, you first call `useDeleteNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoteMutation, { data, loading, error }] = useDeleteNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      rowVersion: // value for 'rowVersion'
 *   },
 * });
 */
export function useDeleteNoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteNoteMutation, DeleteNoteMutationVariables>
) {
  return ApolloReactHooks.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument, baseOptions);
}
export type DeleteNoteMutationHookResult = ReturnType<typeof useDeleteNoteMutation>;
export type DeleteNoteMutationResult = ApolloReactCommon.MutationResult<DeleteNoteMutation>;
export type DeleteNoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteNoteMutation,
  DeleteNoteMutationVariables
>;
export const FetchAllNotesDocument = gql`
  query FetchAllNotes($filters: NoteFilters!) {
    notes(noteFilters: $filters) {
      total
      values {
        noteID
        title
        description
        noteDate
        markdown
        rowVersionString
      }
    }
  }
`;

/**
 * __useFetchAllNotesQuery__
 *
 * To run a query within a React component, call `useFetchAllNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllNotesQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useFetchAllNotesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<FetchAllNotesQuery, FetchAllNotesQueryVariables>
) {
  return ApolloReactHooks.useQuery<FetchAllNotesQuery, FetchAllNotesQueryVariables>(FetchAllNotesDocument, baseOptions);
}
export function useFetchAllNotesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FetchAllNotesQuery, FetchAllNotesQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<FetchAllNotesQuery, FetchAllNotesQueryVariables>(
    FetchAllNotesDocument,
    baseOptions
  );
}
export type FetchAllNotesQueryHookResult = ReturnType<typeof useFetchAllNotesQuery>;
export type FetchAllNotesLazyQueryHookResult = ReturnType<typeof useFetchAllNotesLazyQuery>;
export type FetchAllNotesQueryResult = ApolloReactCommon.QueryResult<FetchAllNotesQuery, FetchAllNotesQueryVariables>;
