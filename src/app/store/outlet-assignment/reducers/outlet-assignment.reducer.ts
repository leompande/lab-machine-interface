import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OutletAssignment } from './outlet-assignment';
import { OutletAssignmentActions, OutletAssignmentActionTypes } from '../actions/outlet-assignment.actions';

export interface State extends EntityState<OutletAssignment> {
  selected: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<OutletAssignment> = createEntityAdapter<OutletAssignment>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: OutletAssignmentActions
): State {
  switch (action.type) {
    case OutletAssignmentActionTypes.LoadOutletAssignments: {
      return { ...state, loading: true };
    }

    case OutletAssignmentActionTypes.DoneLoadingOutletAssignments: {
      return { ...state, loading: false };
    }

    case OutletAssignmentActionTypes.AddOutletAssignment: {
      return adapter.addOne(action.payload.OutletAssignment, state);
    }

    case OutletAssignmentActionTypes.UpsertOutletAssignment: {
      return adapter.upsertOne(action.payload.OutletAssignment, state);
    }

    case OutletAssignmentActionTypes.AddOutletAssignments: {
      return adapter.addMany(action.payload.OutletAssignments, state);
    }

    case OutletAssignmentActionTypes.SelectOutletAssignment: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case OutletAssignmentActionTypes.UpsertOutletAssignments: {
      return adapter.upsertMany(action.payload.OutletAssignments, state);
    }

    case OutletAssignmentActionTypes.UpdateOutletAssignment: {
      return adapter.updateOne(action.payload.OutletAssignment, state);
    }

    case OutletAssignmentActionTypes.UpdateOutletAssignments: {
      return adapter.updateMany(action.payload.OutletAssignments, state);
    }

    case OutletAssignmentActionTypes.DeleteOutletAssignment: {
      return adapter.removeOne(action.payload.id, state);
    }

    case OutletAssignmentActionTypes.DeleteOutletAssignments: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case OutletAssignmentActionTypes.LoadOutletAssignmentsSuccess: {
      return adapter.addAll(action.payload.OutletAssignments, state);
    }

    case OutletAssignmentActionTypes.ClearOutletAssignments: {
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
