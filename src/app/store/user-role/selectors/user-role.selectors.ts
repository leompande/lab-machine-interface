import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserRole from '../reducers/user-role.reducer';

export const selectUserRoleState = createFeatureSelector<fromUserRole.State>(
  'userRole'
);

export const selectCurrentState = createFeatureSelector<fromUserRole.State>('userRole');

export const selectIds = createSelector(selectCurrentState, fromUserRole.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromUserRole.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromUserRole.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromUserRole.selectTotal);
export const selectCurrentId = createSelector(selectCurrentState, fromUserRole.getSelectedId);
export const selectLoading = createSelector(selectCurrentState, fromUserRole.getLoading);
export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id: string) => entities[id]
);

export const currentLogedUserRole = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);
