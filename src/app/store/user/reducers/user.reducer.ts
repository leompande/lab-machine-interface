import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from './user';
import { UserActions, UserActionTypes } from '../actions/user.actions';

export interface State extends EntityState<User> {
  selected: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false
});



export function reducer(
  state = initialState,
  action: UserActions
): State {
  switch (action.type) {
    case UserActionTypes.GetUsers: {
      return {...state, loading: true};
    }

    case UserActionTypes.DoneLoagingUsers: {
      return {...state, loading: false};
    }

    case UserActionTypes.AddUser: {
      return adapter.addOne(action.payload.User, state);
    }

    case UserActionTypes.UpsertUser: {
      return adapter.upsertOne(action.payload.User, state);
    }

    case UserActionTypes.AddUsers: {
      return adapter.addMany(action.payload.Users, state);
    }


    case UserActionTypes.SelectUser: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case UserActionTypes.UpsertUsers: {
      return adapter.upsertMany(action.payload.Users, state);
    }

    case UserActionTypes.UpdateUser: {
      return adapter.updateOne(action.payload.User, state);
    }

    case UserActionTypes.UpdateUsers: {
      return adapter.updateMany(action.payload.Users, state);
    }

    case UserActionTypes.DeleteUser: {
      return adapter.removeOne(action.payload.id, state);
    }

    case UserActionTypes.DeleteUsers: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case UserActionTypes.LoadUsersSuccess: {
      return adapter.addAll(action.payload.Users, state);
    }

    case UserActionTypes.ClearUsers: {
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
