import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SignBoardBatchItem } from './sign-board-batch-item';
import { SignBoardBatchItemActions, SignBoardBatchItemActionTypes } from '../actions/sign-board-batch-item.actions';

export interface State extends EntityState<SignBoardBatchItem> {
  selected: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<SignBoardBatchItem> = createEntityAdapter<SignBoardBatchItem>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: SignBoardBatchItemActions
): State {
  switch (action.type) {
    case SignBoardBatchItemActionTypes.Get: {
      return { ...state, loading: true };
    }

    case SignBoardBatchItemActionTypes.DoneLoading: {
      return { ...state, loading: false };
    }

    case SignBoardBatchItemActionTypes.AddSignBoardBatchItem: {
      return adapter.addOne(action.payload.SignBoardBatchItem, state);
    }

    case SignBoardBatchItemActionTypes.UpsertSignBoardBatchItem: {
      return adapter.upsertOne(action.payload.SignBoardBatchItem, state);
    }

    case SignBoardBatchItemActionTypes.AddSignBoardBatchItems: {
      return adapter.addMany(action.payload.SignBoardBatchItems, state);
    }


    case SignBoardBatchItemActionTypes.SelectSignBoardBatchItem: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case SignBoardBatchItemActionTypes.UpsertSignBoardBatchItems: {
      return adapter.upsertMany(action.payload.SignBoardBatchItems, state);
    }

    case SignBoardBatchItemActionTypes.UpdateSignBoardBatchItem: {
      return adapter.updateOne(action.payload.SignBoardBatchItem, state);
    }

    case SignBoardBatchItemActionTypes.UpdateSignBoardBatchItems: {
      return adapter.updateMany(action.payload.SignBoardBatchItems, state);
    }

    case SignBoardBatchItemActionTypes.DeleteSignBoardBatchItem: {
      return adapter.removeOne(action.payload.id, state);
    }

    case SignBoardBatchItemActionTypes.DeleteSignBoardBatchItems: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case SignBoardBatchItemActionTypes.LoadSignBoardBatchItemsSuccess: {
      return adapter.addAll(action.payload.SignBoardBatchItems, state);
    }

    case SignBoardBatchItemActionTypes.ClearSignBoardBatchItems: {
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
