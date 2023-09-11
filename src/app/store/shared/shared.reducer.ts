import { createReducer, on } from '@ngrx/store';
import { SharedState, initialState } from './shared.state';
import { setErrorMessage, setLoadingSpinner } from './shared.actions';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  })
);

export const sharedReducer = (state: any, action: any) => {
  return _sharedReducer(state, action);
};
