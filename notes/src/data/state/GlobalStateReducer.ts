import { Reducer } from 'react';
import { GlobalState } from './GlobalState';

export interface Action {
  type: ActionType;
  payload?: any;
}

export enum ActionType {
  CHANGE_FILTERS
}

const rootReducer: Reducer<GlobalState, Action> = (state = new GlobalState(), action) => {
  switch (action.type) {
    case ActionType.CHANGE_FILTERS:
      return state.copy({ filters: state.filters.copy(action.payload) });
    default:
      return state;
  }
};

export default rootReducer;
