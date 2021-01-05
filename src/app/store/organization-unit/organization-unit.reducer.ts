import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OrganizationUnit } from './organization-unit.model';
import {
  OrganisatinUnitActions,
  OrganizationUnitActionTypes
} from './organization-unit.actions';
import { OrganizationUnitLevel } from './organization-unit-level.model';
export interface State extends EntityState<OrganizationUnit> {
  organisationUnitLevels: OrganizationUnitLevel[];
  selected: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<OrganizationUnit> = createEntityAdapter<
  OrganizationUnit
>();

export const initialState: State = adapter.getInitialState({
  organisationUnitLevels: [],
  selected: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: OrganisatinUnitActions
): State {
  switch (action.type) {
    case OrganizationUnitActionTypes.GetOrganizationUnits: {
      return { ...state, loading: true };
    }

    case OrganizationUnitActionTypes.DoneLoadingOrganizationUnits: {
      return { ...state, loading: false };
    }

    case OrganizationUnitActionTypes.SetSelectedOrganisatinUnit: {
      return { ...state, selected: action.payload };
    }

    case OrganizationUnitActionTypes.AddOrganisatinUnit: {
      return adapter.addOne(action.payload.organisatinUnit, state);
    }

    case OrganizationUnitActionTypes.GetOrganisatinUnitLevels: {
      return {
        ...state,
        organisationUnitLevels: action.payload.organisationUnitLevels
      };
    }

    case OrganizationUnitActionTypes.UpsertOrganisatinUnit: {
      return adapter.upsertOne(action.payload.organisatinUnit, state);
    }

    case OrganizationUnitActionTypes.AddOrganisatinUnits: {
      return adapter.addMany(action.payload.organisatinUnits, state);
    }

    case OrganizationUnitActionTypes.UpsertOrganisatinUnits: {
      return adapter.upsertMany(action.payload.organisatinUnits, state);
    }

    case OrganizationUnitActionTypes.UpdateOrganisatinUnit: {
      return adapter.updateOne(action.payload.organisatinUnit, state);
    }

    case OrganizationUnitActionTypes.UpdateOrganisatinUnits: {
      return adapter.updateMany(action.payload.organisatinUnits, state);
    }

    case OrganizationUnitActionTypes.DeleteOrganisatinUnit: {
      return adapter.removeOne(action.payload.id, state);
    }

    case OrganizationUnitActionTypes.DeleteOrganisatinUnits: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case OrganizationUnitActionTypes.LoadOrganisatinUnits: {
      return adapter.addAll(action.payload.organisatinUnits, state);
    }

    case OrganizationUnitActionTypes.ClearOrganisatinUnits: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selected;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
