import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Organisation } from './organisation';
import { OrganisationActions, OrganisationActionTypes } from '../actions/organisation.actions';

export interface State extends EntityState<Organisation> {
  selected: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Organisation> = createEntityAdapter<Organisation>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false
});



export function reducer(
  state = initialState,
  action: OrganisationActions
): State {
  switch (action.type) {
    case OrganisationActionTypes.Get: {
      return {...state, loading: true};
    }

    case OrganisationActionTypes.DoneLoading: {
      return {...state, loading: false};
    }

    case OrganisationActionTypes.AddOrganisation: {
      return adapter.addOne(action.payload.Organisation, state);
    }

    case OrganisationActionTypes.UpsertOrganisation: {
      return adapter.upsertOne(action.payload.Organisation, state);
    }

    case OrganisationActionTypes.AddOrganisations: {
      return adapter.addMany(action.payload.Organisations, state);
    }


    case OrganisationActionTypes.SelectOrganisation: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case OrganisationActionTypes.UpsertOrganisations: {
      return adapter.upsertMany(action.payload.Organisations, state);
    }

    case OrganisationActionTypes.UpdateOrganisation: {
      return adapter.updateOne(action.payload.Organisation, state);
    }

    case OrganisationActionTypes.UpdateOrganisations: {
      return adapter.updateMany(action.payload.Organisations, state);
    }

    case OrganisationActionTypes.DeleteOrganisation: {
      return adapter.removeOne(action.payload.id, state);
    }

    case OrganisationActionTypes.DeleteOrganisations: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case OrganisationActionTypes.LoadOrganisationsSuccess: {
      return adapter.addAll(action.payload.Organisations, state);
    }

    case OrganisationActionTypes.ClearOrganisations: {
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
  selectTotal,
} = adapter.getSelectors();
