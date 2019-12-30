import { useContext } from 'react';
import { GlobalStateStore } from '../../data/state/GlobalStateContext';
import { ActionType } from '../../data/state/GlobalStateReducer';
import { ErrorModel } from '../../data/state/ErrorModel';

export const useDispatchError: () => {
  dispatchClearError: () => void;
  dispatchError: (error: { message: string } | undefined) => void;
  error: ErrorModel | null;
} = () => {
  const { state, dispatch } = useContext(GlobalStateStore);

  const dispatchError = (error: { message: string } | undefined): void => {
    dispatch({ type: ActionType.DISPATCH_ERROR, payload: error });
  };

  const dispatchClearError = (): void => {
    dispatch({ type: ActionType.CLEAR_ERROR });
  };

  return { dispatchError, dispatchClearError, error: state.error };
};
