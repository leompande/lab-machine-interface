import { Action } from '@ngrx/store';
import { UserRole } from '../reducers/user-role';
import { Update } from '@ngrx/entity';

export enum UserRoleActionTypes {
  Get = '[UserRole] Get UserRoles',
  DoneLoading = '[UserRole] Done Loading UserRoles',
  LoadUserRoles = '[UserRole] Load UserRoles',
  LoadUserRolesSuccess = '[UserRole] Load UserRoles Success',
  SelectUserRole = '[UserRole] Select UserRole',
  LoadUserRolesFailure = '[UserRole] Load UserRoles Failure',
  AddUserRole = '[UserRole] Add UserRole',
  AddUserRoleSuccess = '[UserRole] Add UserRole Success',
  AddUserRoleFailure = '[UserRole] Add UserRole Failure',
  UpsertUserRole = '[UserRole] Upsert UserRole',
  AddUserRoles = '[UserRole] Add UserRoles',
  UpsertUserRoles = '[UserRole] Upsert UserRoles',
  UpdateUserRole = '[UserRole] Update UserRole',
  UpdateUserRoleSuccess = '[UserRole] Update UserRole Success',
  UpdateUserRoleFailure = '[UserRole] Update UserRole Failure',
  UpdateUserRoles = '[UserRole] Update UserRoles',
  DeleteUserRole = '[UserRole] Delete UserRole',
  DeleteUserRoleSuccess = '[UserRole] Delete UserRole Success',
  DeleteUserRoleFailure = '[UserRole] Delete UserRole Failure',
  DeleteUserRoles = '[UserRole] Delete UserRoles',
  ClearUserRoles = '[UserRole] Clear UserRoles'
}

export class LoadUserRoles implements Action {
  readonly type = UserRoleActionTypes.LoadUserRoles;
}

export class LoadUserRolesSuccess implements Action {
  readonly type = UserRoleActionTypes.LoadUserRolesSuccess;
  constructor(public payload: { UserRoles: UserRole[] }) { }
}

export class LoadUserRolesFailure implements Action {
  readonly type = UserRoleActionTypes.LoadUserRolesFailure;
  constructor(public payload: { error: any }) { }
} 


export class AddUserRole implements Action {
  readonly type = UserRoleActionTypes.AddUserRole;

  constructor(public payload: { UserRole: UserRole }) {
  }
}

export class AddUserRoleSuccess implements Action {
  readonly type = UserRoleActionTypes.AddUserRoleSuccess;

  constructor(public payload: any) {
  }
}
export class AddUserRoleFailure implements Action {
  readonly type = UserRoleActionTypes.AddUserRoleFailure;

  constructor(public payload: any) {
  }
}

export class UpsertUserRole implements Action {
  readonly type = UserRoleActionTypes.UpsertUserRole;

  constructor(public payload: { UserRole: UserRole }) {
  }
}

export class AddUserRoles implements Action {
  readonly type = UserRoleActionTypes.AddUserRoles;

  constructor(public payload: { UserRoles: UserRole[] }) {
  }
}

export class UpsertUserRoles implements Action {
  readonly type = UserRoleActionTypes.UpsertUserRoles;

  constructor(public payload: { UserRoles: UserRole[] }) {
  }
}

export class UpdateUserRole implements Action {
  readonly type = UserRoleActionTypes.UpdateUserRole;

  constructor(public payload: any) {
  }
}

export class UpdateUserRoleSuccess implements Action {
  readonly type = UserRoleActionTypes.UpdateUserRoleSuccess;

  constructor(public payload: any) {
  }
}

export class UpdateUserRoleFailure implements Action {
  readonly type = UserRoleActionTypes.UpdateUserRoleFailure;

  constructor(public payload: any) {
  }
}

export class SelectUserRole implements Action {
  readonly type = UserRoleActionTypes.SelectUserRole;

  constructor(public payload: string) {
  }
}
export class UpdateUserRoles implements Action {
  readonly type = UserRoleActionTypes.UpdateUserRoles;

  constructor(public payload: { UserRoles: Update<UserRole>[] }) {
  }
}

export class DeleteUserRole implements Action {
  readonly type = UserRoleActionTypes.DeleteUserRole;

  constructor(public payload: { id: string }) {
  }
}


export class DeleteUserRoleSuccess implements Action {
  readonly type = UserRoleActionTypes.DeleteUserRoleSuccess;

  constructor(public payload: any) {
  }
}


export class DeleteUserRoleFailure implements Action {
  readonly type = UserRoleActionTypes.DeleteUserRoleFailure;

  constructor(public payload: any) {
  }
}

export class DeleteUserRoles implements Action {
  readonly type = UserRoleActionTypes.DeleteUserRoles;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearUserRoles implements Action {
  readonly type = UserRoleActionTypes.ClearUserRoles;
}

export class GetUserRoles implements Action {
  readonly type = UserRoleActionTypes.Get;
}

export class DoneLoagingUserRoles implements Action {
  readonly type = UserRoleActionTypes.DoneLoading;
}

export type UserRoleActions =
  LoadUserRoles
  | LoadUserRolesSuccess
  | AddUserRoleFailure
  | AddUserRole
  | AddUserRoleSuccess
  | UpsertUserRole
  | AddUserRoles
  | SelectUserRole
  | UpsertUserRoles
  | UpdateUserRole
  | UpdateUserRoleSuccess
  | UpdateUserRoleFailure
  | UpdateUserRoles
  | DeleteUserRole
  | DeleteUserRoleSuccess
  | DeleteUserRoleFailure
  | DeleteUserRoles
  | ClearUserRoles
  | GetUserRoles
  | DoneLoagingUserRoles;
