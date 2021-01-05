import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SignBoardBatch } from './sign-board-batch';
import { SignBoardBatchActions, SignBoardBatchActionTypes } from '../actions/sign-board-batch.actions';

export interface State extends EntityState<SignBoardBatch> {
  selected: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<SignBoardBatch> = createEntityAdapter<SignBoardBatch>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: SignBoardBatchActions
): State {
  switch (action.type) {
    case SignBoardBatchActionTypes.Get: {
      return { ...state, loading: true };
    }

    case SignBoardBatchActionTypes.DoneLoading: {
      return { ...state, loading: false };
    }

    case SignBoardBatchActionTypes.AddSignBoardBatch: {
      return adapter.addOne(action.payload.SignBoardBatch, state);
    }

    case SignBoardBatchActionTypes.UpsertSignBoardBatch: {
      return adapter.upsertOne(action.payload.SignBoardBatch, state);
    }

    case SignBoardBatchActionTypes.AddSignBoardBatches: {
      return adapter.addMany(action.payload.SignBoardBatches, state);
    }


    case SignBoardBatchActionTypes.SelectSignBoardBatch: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case SignBoardBatchActionTypes.UpsertSignBoardBatches: {
      return adapter.upsertMany(action.payload.SignBoardBatches, state);
    }

    case SignBoardBatchActionTypes.UpdateSignBoardBatch: {
      return adapter.updateOne(action.payload.SignBoardBatch, state);
    }

    case SignBoardBatchActionTypes.UpdateSignBoardBatches: {
      return adapter.updateMany(action.payload.SignBoardBatches, state);
    }

    case SignBoardBatchActionTypes.DeleteSignBoardBatch: {
      return adapter.removeOne(action.payload.id, state);
    }

    case SignBoardBatchActionTypes.DeleteSignBoardBatches: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case SignBoardBatchActionTypes.LoadSignBoardBatchesSuccess: {
      return adapter.addAll(action.payload.SignBoardBatches, state);
    }

    case SignBoardBatchActionTypes.ClearSignBoardBatches: {
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
