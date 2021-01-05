import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSignBoardBatch from '../reducers/sign-board-batch-item.reducer';

export const selectSignBoardBatchState = createFeatureSelector<fromSignBoardBatch.State>(
  'signBoardBatch'
);

export const selectCurrentState = createFeatureSelector<fromSignBoardBatch.State>('signBoardBatch');

export const selectIds = createSelector(selectCurrentState, fromSignBoardBatch.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromSignBoardBatch.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromSignBoardBatch.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromSignBoardBatch.selectTotal);
export const selectCurrentId = createSelector(selectCurrentState, fromSignBoardBatch.getSelectedId);
export const selectLoading = createSelector(selectCurrentState, fromSignBoardBatch.getLoading);
export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id: string) => entities[id]
);

export const currentLogedSignBoardBatch = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);
