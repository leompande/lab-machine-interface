import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SignBoard } from './sign-board';
import { SignBoardActions, SignBoardActionTypes } from '../actions/sign-board.actions';

export interface State extends EntityState<SignBoard> {
  selected: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<SignBoard> = createEntityAdapter<SignBoard>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false
});



export function reducer(
  state = initialState,
  action: SignBoardActions
): State {
  switch (action.type) {
    case SignBoardActionTypes.Get: {
      return {...state, loading: true};
    }

    case SignBoardActionTypes.DoneLoading: {
      return {...state, loading: false};
    }

    case SignBoardActionTypes.AddSignBoard: {
      return adapter.addOne(action.payload.SignBoard, state);
    }

    case SignBoardActionTypes.UpsertSignBoard: {
      return adapter.upsertOne(action.payload.SignBoard, state);
    }

    case SignBoardActionTypes.AddSignBoards: {
      return adapter.addMany(action.payload.SignBoards, state);
    }


    case SignBoardActionTypes.SelectSignBoard: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case SignBoardActionTypes.UpsertSignBoards: {
      return adapter.upsertMany(action.payload.SignBoards, state);
    }

    case SignBoardActionTypes.UpdateSignBoard: {
      return adapter.updateOne(action.payload.SignBoard, state);
    }

    case SignBoardActionTypes.UpdateSignBoards: {
      return adapter.updateMany(action.payload.SignBoards, state);
    }

    case SignBoardActionTypes.DeleteSignBoard: {
      return adapter.removeOne(action.payload.id, state);
    }

    case SignBoardActionTypes.DeleteSignBoards: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case SignBoardActionTypes.LoadSignBoardsSuccess: {
      return adapter.addAll(action.payload.SignBoards, state);
    }

    case SignBoardActionTypes.ClearSignBoards: {
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
