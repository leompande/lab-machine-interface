import { Action } from '@ngrx/store';
import { User } from '../reducers/user';
import { Update } from '@ngrx/entity';

export enum UserActionTypes {
  GetUsers = '[User] Get Users',
  DoneLoagingUsers = '[User] Done Loading Users',
  LoadUsers = '[User] Load Users',
  LoadUsersSuccess = '[User] Load Users Success',
  SelectUser = '[User] Select User',
  LoadUsersFailure = '[User] Load Users Failure',
  AddUser = '[User] Add User',
  AddUserSuccess = '[User] Add User Success',
  AddUserFailure = '[User] Add User Failure',
  UpsertUser = '[User] Upsert User',
  AddUsers = '[User] Add Users',
  UpsertUsers = '[User] Upsert Users',
  UpdateUser = '[User] Update User',
  UpdateUserSuccess = '[User] Update User Success',
  UpdateUserFailure = '[User] Update User Failure',
  UpdateUsers = '[User] Update Users',
  DeleteUser = '[User] Delete User',
  DeleteUserSuccess = '[User] Delete User Success',
  DeleteUserFailure = '[User] Delete User Failure',
  DeleteUsers = '[User] Delete Users',
  ClearUsers = '[User] Clear Users'
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LoadUsersSuccess;
  constructor(public payload: { Users: User[] }) { }
}

export class LoadUsersFailure implements Action {
  readonly type = UserActionTypes.LoadUsersFailure;
  constructor(public payload: { error: any }) { }
}


export class AddUser implements Action {
  readonly type = UserActionTypes.AddUser;

  constructor(public payload: { User: User }) {
  }
}

export class AddUserSuccess implements Action {
  readonly type = UserActionTypes.AddUserSuccess;

  constructor(public payload: any) {
  }
}
export class AddUserFailure implements Action {
  readonly type = UserActionTypes.AddUserFailure;

  constructor(public payload: any) {
  }
}

export class UpsertUser implements Action {
  readonly type = UserActionTypes.UpsertUser;

  constructor(public payload: { User: User }) {
  }
}

export class AddUsers implements Action {
  readonly type = UserActionTypes.AddUsers;

  constructor(public payload: { Users: User[] }) {
  }
}

export class UpsertUsers implements Action {
  readonly type = UserActionTypes.UpsertUsers;

  constructor(public payload: { Users: User[] }) {
  }
}

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UpdateUser;

  constructor(public payload: any) {
  }
}

export class UpdateUserSuccess implements Action {
  readonly type = UserActionTypes.UpdateUserSuccess;

  constructor(public payload: any) {
  }
}

export class UpdateUserFailure implements Action {
  readonly type = UserActionTypes.UpdateUserFailure;

  constructor(public payload: any) {
  }
}

export class SelectUser implements Action {
  readonly type = UserActionTypes.SelectUser;

  constructor(public payload: string) {
  }
}
export class UpdateUsers implements Action {
  readonly type = UserActionTypes.UpdateUsers;

  constructor(public payload: { Users: Update<User>[] }) {
  }
}

export class DeleteUser implements Action {
  readonly type = UserActionTypes.DeleteUser;

  constructor(public payload: { id: string }) {
  }
}


export class DeleteUserSuccess implements Action {
  readonly type = UserActionTypes.DeleteUserSuccess;

  constructor(public payload: any) {
  }
}


export class DeleteUserFailure implements Action {
  readonly type = UserActionTypes.DeleteUserFailure;

  constructor(public payload: any) {
  }
}

export class DeleteUsers implements Action {
  readonly type = UserActionTypes.DeleteUsers;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearUsers implements Action {
  readonly type = UserActionTypes.ClearUsers;
}

export class GetUsers implements Action {
  readonly type = UserActionTypes.GetUsers;
}

export class DoneLoagingUsers implements Action {
  readonly type = UserActionTypes.DoneLoagingUsers;
}

export type UserActions =
  LoadUsers
  | LoadUsersSuccess
  | AddUserFailure
  | AddUser
  | AddUserSuccess
  | UpsertUser
  | AddUsers
  | SelectUser
  | UpsertUsers
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFailure
  | UpdateUsers
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFailure
  | DeleteUsers
  | ClearUsers
  | GetUsers
  | DoneLoagingUsers;
