import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Application } from './application';
import { ApplicationActions, ApplicationActionTypes } from '../actions/application.actions';

export interface State extends EntityState<Application> {
  selected: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Application> = createEntityAdapter<Application>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false
});



export function reducer(
  state = initialState,
  action: ApplicationActions
): State {
  switch (action.type) {
    case ApplicationActionTypes.Get: {
      return {...state, loading: true};
    }

    case ApplicationActionTypes.DoneLoading: {
      return {...state, loading: false};
    }

    case ApplicationActionTypes.AddApplication: {
      return adapter.addOne(action.payload.Application, state);
    }

    case ApplicationActionTypes.UpsertApplication: {
      return adapter.upsertOne(action.payload.Application, state);
    }

    case ApplicationActionTypes.AddApplications: {
      return adapter.addMany(action.payload.Applications, state);
    }


    case ApplicationActionTypes.SelectApplication: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case ApplicationActionTypes.UpsertApplications: {
      return adapter.upsertMany(action.payload.Applications, state);
    }

    case ApplicationActionTypes.UpdateApplication: {
      return adapter.updateOne(action.payload.Application, state);
    }

    case ApplicationActionTypes.UpdateApplications: {
      return adapter.updateMany(action.payload.Applications, state);
    }

    case ApplicationActionTypes.DeleteApplication: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ApplicationActionTypes.DeleteApplications: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ApplicationActionTypes.LoadApplicationsSuccess: {
      return adapter.addAll(action.payload.Applications, state);
    }

    case ApplicationActionTypes.ClearApplications: {
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
