import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOutletAssignment from '../reducers/outlet-assignment.reducer';

export const selectOutletAssignmentState = createFeatureSelector<fromOutletAssignment.State>(
  'outletAssignment'
);

export const selectCurrentState = createFeatureSelector<fromOutletAssignment.State>('outletAssignment');

export const selectIds = createSelector(selectCurrentState, fromOutletAssignment.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromOutletAssignment.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromOutletAssignment.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromOutletAssignment.selectTotal);
export const selectCurrentId = createSelector(selectCurrentState, fromOutletAssignment.getSelectedId);
export const selectLoading = createSelector(selectCurrentState, fromOutletAssignment.getLoading);
export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id: string) => entities[id]
);

export const currentLogedOutletAssignment = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);
