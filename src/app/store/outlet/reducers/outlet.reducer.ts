import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Outlet } from './outlet';
import { OutletActions, OutletActionTypes } from '../actions/outlet.actions';

export interface State extends EntityState<Outlet> {
  selected: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Outlet> = createEntityAdapter<Outlet>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false
});



export function reducer(
  state = initialState,
  action: OutletActions
): State {
  switch (action.type) {
    case OutletActionTypes.LoadOutlets: {
      return { ...state, loading: true };
    }


    case OutletActionTypes.DoneLoadingOutlets: {
      return { ...state, loading: false };
    }

    case OutletActionTypes.LoadOutletsFailure: {
      return { ...state, loading: false };
    }

    case OutletActionTypes.AddOutlet: {
      return adapter.addOne(action.payload.Outlet, state);
    }

    case OutletActionTypes.UpsertOutlet: {
      return adapter.upsertOne(action.payload.Outlet, state);
    }

    case OutletActionTypes.AddOutlets: {
      return adapter.addMany(action.payload.Outlets, state);
    }


    case OutletActionTypes.SelectOutlet: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case OutletActionTypes.UpsertOutlets: {
      return adapter.upsertMany(action.payload.Outlets, state);
    }

    case OutletActionTypes.UpdateOutlet: {
      return adapter.updateOne(action.payload.Outlet, state);
    }

    case OutletActionTypes.UpdateOutlets: {
      return adapter.updateMany(action.payload.Outlets, state);
    }

    case OutletActionTypes.DeleteOutlet: {
      return adapter.removeOne(action.payload.id, state);
    }

    case OutletActionTypes.DeleteOutlets: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case OutletActionTypes.LoadOutletsSuccess: {
      return adapter.addAll(action.payload.Outlets, state);
    }

    case OutletActionTypes.ClearOutlets: {
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
