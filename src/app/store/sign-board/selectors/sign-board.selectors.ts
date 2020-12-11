import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSignBoard from '../reducers/sign-board.reducer';

export const selectSignBoardState = createFeatureSelector<fromSignBoard.State>(
  'signBoard'
);

export const selectCurrentState = createFeatureSelector<fromSignBoard.State>('signBoard');

export const selectIds = createSelector(selectCurrentState, fromSignBoard.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromSignBoard.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromSignBoard.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromSignBoard.selectTotal);
export const selectCurrentId = createSelector(selectCurrentState, fromSignBoard.getSelectedId);
export const selectLoading = createSelector(selectCurrentState, fromSignBoard.getLoading);
export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id: string) => entities[id]
);

export const currentLogedSignBoard = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);
