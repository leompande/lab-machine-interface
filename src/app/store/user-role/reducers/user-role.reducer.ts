import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserRole } from './user-role';
import { UserRoleActions, UserRoleActionTypes } from '../actions/user-role.actions';

export interface State extends EntityState<UserRole> {
  selected: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<UserRole> = createEntityAdapter<UserRole>();

export const initialState: State = adapter.getInitialState({
  selected: null,
  loading: false,
  loaded: false
});



export function reducer(
  state = initialState,
  action: UserRoleActions
): State {
  switch (action.type) {
    case UserRoleActionTypes.Get: {
      return {...state, loading: true};
    }

    case UserRoleActionTypes.DoneLoading: {
      return {...state, loading: false};
    }

    case UserRoleActionTypes.AddUserRole: {
      return adapter.addOne(action.payload.UserRole, state);
    }

    case UserRoleActionTypes.UpsertUserRole: {
      return adapter.upsertOne(action.payload.UserRole, state);
    }

    case UserRoleActionTypes.AddUserRoles: {
      return adapter.addMany(action.payload.UserRoles, state);
    }


    case UserRoleActionTypes.SelectUserRole: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case UserRoleActionTypes.UpsertUserRoles: {
      return adapter.upsertMany(action.payload.UserRoles, state);
    }

    case UserRoleActionTypes.UpdateUserRole: {
      return adapter.updateOne(action.payload.UserRole, state);
    }

    case UserRoleActionTypes.UpdateUserRoles: {
      return adapter.updateMany(action.payload.UserRoles, state);
    }

    case UserRoleActionTypes.DeleteUserRole: {
      return adapter.removeOne(action.payload.id, state);
    }

    case UserRoleActionTypes.DeleteUserRoles: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case UserRoleActionTypes.LoadUserRolesSuccess: {
      return adapter.addAll(action.payload.UserRoles, state);
    }

    case UserRoleActionTypes.ClearUserRoles: {
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
