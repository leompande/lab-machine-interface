import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  'user'
);

export const selectCurrentState = createFeatureSelector<fromUser.State>('user');

export const selectIds = createSelector(selectCurrentState, fromUser.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromUser.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromUser.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromUser.selectTotal);
export const selectCurrentId = createSelector(selectCurrentState, fromUser.getSelectedId);
export const selectLoading = createSelector(selectCurrentState, fromUser.getLoading);
export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id: string) => entities[id]
);

export const currentLogedUser = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);
