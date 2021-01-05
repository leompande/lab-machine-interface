import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './organization-unit.reducer';
import * as fromuser from '../user/reducers/user.reducer';
export const selectCurrentState = createFeatureSelector<fromReducer.State>(
  'organizationUnit'
);

export const selectIds = createSelector(
  selectCurrentState,
  fromReducer.selectIds
);
export const selectEntities = createSelector(
  selectCurrentState,
  fromReducer.selectEntities
);
export const selectAll = createSelector(
  selectCurrentState,
  fromReducer.selectAll
);
export const selectTotal = createSelector(
  selectCurrentState,
  fromReducer.selectTotal
);
export const selectLoading = createSelector(
  selectCurrentState,
  fromReducer.getLoading
);
export const selectCurrentId = createSelector(
  selectCurrentState,
  fromReducer.getSelectedId
);

export const selectById = (id: string) =>
  createSelector(
    selectEntities,
    entities => entities[id]
  );

export const selected = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => entities[id]
);

export const selectSelectedOu = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => entities[id]
);

export const selectLevels = createSelector(
  selectCurrentState,
  state => state.organisationUnitLevels
);

export const selectZones = createSelector(
  selectAll,
  (allItems) => allItems.filter(i => i.level + '' === '3')
);

export const selectAllRegions = createSelector(
  selectAll,
  (allItems) => allItems.filter(i => i.level + '' === '4')
);

export const selectAllDistricts = createSelector(
  selectAll,
  (allItems) => allItems.filter(i => i.level + '' === '5')
);

export const selectDistrictsFromRegion = (regionId: string) =>
  createSelector(
    selectAllDistricts,
    (allItems) => allItems.filter(i => i.parent && i.parent.id === regionId)
  );

export const selectUserRecepient = createSelector(
  selectEntities,
  fromuser.getCurrentUser,
  (entities, userData: any) => {
    if (
      userData &&
      userData.organisationUnits &&
      userData.organisationUnits.length > 0
    ) {
      if (entities[userData.organisationUnits[0].id]) {
        return entities[userData.organisationUnits[0].id].children;
      }
    } else if (
      userData &&
      userData.dataViewOrganisationUnits &&
      userData.dataViewOrganisationUnits.length > 0
    ) {
      if (entities[userData.dataViewOrganisationUnits[0].id]) {
        return entities[userData.dataViewOrganisationUnits[0].id].children;
      }
    }
  }
);
