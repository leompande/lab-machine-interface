import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOutlet from '../reducers/outlet.reducer';

export const selectOutletState = createFeatureSelector<fromOutlet.State>(
  'outlet'
);

export const selectCurrentState = createFeatureSelector<fromOutlet.State>('outlet');

export const selectIds = createSelector(selectCurrentState, fromOutlet.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromOutlet.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromOutlet.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromOutlet.selectTotal);
export const selectCurrentId = createSelector(selectCurrentState, fromOutlet.getSelectedId);
export const selectLoading = createSelector(selectCurrentState, fromOutlet.getLoading);
export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id: string) => entities[id]
);

export const currentLogedOutlet = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);
