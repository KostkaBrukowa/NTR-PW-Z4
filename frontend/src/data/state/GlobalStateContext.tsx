import React, { createContext, Dispatch, useReducer } from 'react';
import rootReducer, { Action } from './GlobalStateReducer';
import { GlobalState } from './GlobalState';

export interface ContextState {
  state: GlobalState;
  dispatch: Dispatch<Action>;
}

export const GlobalStateStore = createContext<ContextState>({
  state: new GlobalState(),
  dispatch: () => {}
});

const AppContext: React.FC = props => {
  const { children } = props;
  const { Provider } = GlobalStateStore;
  const [state, dispatch] = useReducer(rootReducer, new GlobalState());

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export default AppContext;
