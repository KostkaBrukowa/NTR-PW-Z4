import { ApolloError } from 'apollo-client';

export function isError(error: any): error is ApolloError {
  return !!error && !!error.message;
}

export function isNetworkError(error: ApolloError): boolean {
  return error.message.startsWith('Network error');
}

interface GraphQLError {
  message: string;
  location: string[];
  path: string[];
}

interface NetworkError {
  result?: { errors?: GraphQLError[] };
}

export function getGraphQLMessages(networkError: NetworkError): undefined | GraphQLError[] {
  return networkError.result && networkError.result.errors;
}
