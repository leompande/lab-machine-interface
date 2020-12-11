import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrganisation from '../reducers/organisation.reducer';

export const selectOrganisationState = createFeatureSelector<fromOrganisation.State>(
  'organisation'
);

export const selectCurrentState = createFeatureSelector<fromOrganisation.State>('organisation');

export const selectIds = createSelector(selectCurrentState, fromOrganisation.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromOrganisation.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromOrganisation.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromOrganisation.selectTotal);
export const selectCurrentId = createSelector(selectCurrentState, fromOrganisation.getSelectedId);
export const selectLoading = createSelector(selectCurrentState, fromOrganisation.getLoading);
export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id: string) => entities[id]
);

export const currentLogedOrganisation = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);
