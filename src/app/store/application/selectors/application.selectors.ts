import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApplication from '../reducers/application.reducer';

export const selectApplicationState = createFeatureSelector<fromApplication.State>(
  'application'
);

export const selectCurrentState = createFeatureSelector<fromApplication.State>('application');

export const selectIds = createSelector(selectCurrentState, fromApplication.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromApplication.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromApplication.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromApplication.selectTotal);
export const selectCurrentId = createSelector(selectCurrentState, fromApplication.getSelectedId);
export const selectLoading = createSelector(selectCurrentState, fromApplication.getLoading);
export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id: string) => entities[id]
);

export const currentLogedApplication = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);
