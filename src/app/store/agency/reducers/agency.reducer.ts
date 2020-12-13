import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Agency } from './agency';
import { AgencyActions, AgencyActionTypes } from '../actions/agency.actions';

export interface State extends EntityState<Agency> {
  selected: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Agency> = createEntityAdapter<Agency>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false
});



export function reducer(
  state = initialState,
  action: AgencyActions
): State {
  switch (action.type) {
    case AgencyActionTypes.Get: {
      return {...state, loading: true};
    }

    case AgencyActionTypes.DoneLoading: {
      return {...state, loading: false};
    }

    case AgencyActionTypes.AddAgency: {
      return adapter.addOne(action.payload.Agency, state);
    }

    case AgencyActionTypes.UpsertAgency: {
      return adapter.upsertOne(action.payload.Agency, state);
    }

    case AgencyActionTypes.AddAgencies: {
      return adapter.addMany(action.payload.Agencies, state);
    }


    case AgencyActionTypes.SelectAgency: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case AgencyActionTypes.UpsertAgencies: {
      return adapter.upsertMany(action.payload.Agencies, state);
    }

    case AgencyActionTypes.UpdateAgency: {
      return adapter.updateOne(action.payload.Agency, state);
    }

    case AgencyActionTypes.UpdateAgencies: {
      return adapter.updateMany(action.payload.Agencies, state);
    }

    case AgencyActionTypes.DeleteAgency: {
      return adapter.removeOne(action.payload.id, state);
    }

    case AgencyActionTypes.DeleteAgencies: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case AgencyActionTypes.LoadAgenciesSuccess: {
      return adapter.addAll(action.payload.Agencies, state);
    }

    case AgencyActionTypes.ClearAgencies: {
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
