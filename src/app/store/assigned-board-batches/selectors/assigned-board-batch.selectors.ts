import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAssignedBoardBatch from '../reducers/assigned-board-batch.reducer';

export const selectAssignedBoardBatchState = createFeatureSelector<fromAssignedBoardBatch.State>(
  'assignedBoardBatch'
);

export const selectCurrentState = createFeatureSelector<fromAssignedBoardBatch.State>('assignedBoardBatch');

export const selectIds = createSelector(selectCurrentState, fromAssignedBoardBatch.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromAssignedBoardBatch.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromAssignedBoardBatch.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromAssignedBoardBatch.selectTotal);
export const selectCurrentId = createSelector(selectCurrentState, fromAssignedBoardBatch.getSelectedId);
export const selectLoading = createSelector(selectCurrentState, fromAssignedBoardBatch.getLoading);
export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id: string) => entities[id]
);

export const currentLogedAssignedBoardBatch = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);
