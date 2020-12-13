import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAgency from '../reducers/agency.reducer';

export const selectAgencyState = createFeatureSelector<fromAgency.State>(
  'agency'
);

export const selectCurrentState = createFeatureSelector<fromAgency.State>('agency');

export const selectIds = createSelector(selectCurrentState, fromAgency.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromAgency.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromAgency.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromAgency.selectTotal);
export const selectCurrentId = createSelector(selectCurrentState, fromAgency.getSelectedId);
export const selectLoading = createSelector(selectCurrentState, fromAgency.getLoading);
export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id: string) => entities[id]
);

export const currentLogedAgency = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);
