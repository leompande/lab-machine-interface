import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSignBoardBatch from '../reducers/sign-board-batch.reducer';

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
export const selectTotalSignBoards = (agency_name: string) => createSelector(selectAll, (batch) => {
  if (agency_name) {
    return getTotalSignBoards(batch.filter(batchItem => {
      return batchItem.agency_name == agency_name;
    }));
  }

  return getTotalSignBoards(batch);
})
export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id: string) => entities[id]
);

export const currentLogedSignBoardBatch = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);


function getTotalSignBoards(batches: any[]) {
  return batches.reduce((a: any, b: any) => {
    return (a) + (+b.signboard_quantity);
  }, 0);
}
