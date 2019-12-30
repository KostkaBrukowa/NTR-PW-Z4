import { Reducer } from 'react';
import { GlobalState } from './GlobalState';
import { getGraphQLMessages, isError, isNetworkError } from '../../utils/GraphQl';
import { ErrorModel, ErrorType } from './ErrorModel';

export interface Action {
  type: ActionType;
  payload?: any;
}

export enum ActionType {
  CHANGE_FILTERS,
  DISPATCH_ERROR,
  CLEAR_ERROR
}

const rootReducer: Reducer<GlobalState, Action> = (state = new GlobalState(), action) => {
  switch (action.type) {
    case ActionType.CHANGE_FILTERS:
      return state.copy({ filters: state.filters.copy(action.payload) });
    case ActionType.CLEAR_ERROR:
      return state.copy({ error: undefined });
    case ActionType.DISPATCH_ERROR: {
      if (isError(action.payload)) {
        const { networkError } = action.payload as any;

        const graphQLErrors = getGraphQLMessages(networkError);

        const message = graphQLErrors && graphQLErrors.length > 0 ? graphQLErrors[0].message : 'Something went wrong';

        return isNetworkError(action.payload)
          ? state.copy({ error: new ErrorModel(message, ErrorType.NETWORK) })
          : state.copy({ error: new ErrorModel(message, ErrorType.USER) });
      }
      return state;
    }
    default:
      return state;
  }
};

export default rootReducer;
