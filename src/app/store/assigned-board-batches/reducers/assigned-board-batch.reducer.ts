import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AssignedBoardBatch } from './assigned-board-batch';
import { AssignedBoardBatchActions, AssignedBoardBatchActionTypes } from '../actions/assigned-board-batch.actions';

export interface State extends EntityState<AssignedBoardBatch> {
  selected: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<AssignedBoardBatch> = createEntityAdapter<AssignedBoardBatch>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: AssignedBoardBatchActions
): State {
  switch (action.type) {
    case AssignedBoardBatchActionTypes.LoadAssignedBoardBatches: {
      return { ...state, loading: true };
    }

    case AssignedBoardBatchActionTypes.DoneLoadingAssignedBoardBatches: {
      return { ...state, loading: false };
    }

    case AssignedBoardBatchActionTypes.AddAssignedBoardBatch: {
      return adapter.addOne(action.payload.AssignedBoardBatch, state);
    }

    case AssignedBoardBatchActionTypes.UpsertAssignedBoardBatch: {
      return adapter.upsertOne(action.payload.AssignedBoardBatch, state);
    }

    case AssignedBoardBatchActionTypes.AddAssignedBoardBatches: {
      return adapter.addMany(action.payload.AssignedBoardBatches, state);
    }


    case AssignedBoardBatchActionTypes.SelectAssignedBoardBatch: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case AssignedBoardBatchActionTypes.UpsertAssignedBoardBatches: {
      return adapter.upsertMany(action.payload.AssignedBoardBatches, state);
    }

    case AssignedBoardBatchActionTypes.UpdateAssignedBoardBatch: {
      return adapter.updateOne(action.payload.AssignedBoardBatch, state);
    }

    case AssignedBoardBatchActionTypes.UpdateAssignedBoardBatches: {
      return adapter.updateMany(action.payload.AssignedBoardBatches, state);
    }

    case AssignedBoardBatchActionTypes.DeleteAssignedBoardBatch: {
      return adapter.removeOne(action.payload.id, state);
    }

    case AssignedBoardBatchActionTypes.DeleteAssignedBoardBatches: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case AssignedBoardBatchActionTypes.LoadAssignedBoardBatchesSuccess: {
      return adapter.addAll(action.payload.AssignedBoardBatches, state);
    }

    case AssignedBoardBatchActionTypes.ClearAssignedBoardBatches: {
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
