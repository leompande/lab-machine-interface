import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCampaign from '../reducers/campaign.reducer';

export const selectCampaignState = createFeatureSelector<fromCampaign.State>(
  'campaign'
);

export const selectCurrentState = createFeatureSelector<fromCampaign.State>('campaign');

export const selectIds = createSelector(selectCurrentState, fromCampaign.selectIds);
export const selectEntities = createSelector(selectCurrentState, fromCampaign.selectEntities);
export const selectAll = createSelector(selectCurrentState, fromCampaign.selectAll);
export const selectTotal = createSelector(selectCurrentState, fromCampaign.selectTotal);
export const selectCurrentId = createSelector(selectCurrentState, fromCampaign.getSelectedId);
export const selectLoading = createSelector(selectCurrentState, fromCampaign.getLoading);
export const selectById = (id: string) => createSelector(
  selectEntities, (entities) => entities[id]
);

export const selected = createSelector(
  selectEntities, selectCurrentId, (entities, id: string) => entities[id]
);

export const currentLogedCampaign = createSelector(
  selectEntities, selectCurrentId, (entities, id) => entities[id]
);
