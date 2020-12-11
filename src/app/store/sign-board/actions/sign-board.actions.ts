import { Action } from '@ngrx/store';
import { SignBoard } from '../reducers/sign-board';
import { Update } from '@ngrx/entity';

export enum SignBoardActionTypes {
  Get = '[SignBoard] Get SignBoards',
  DoneLoading = '[SignBoard] Done Loading SignBoards',
  LoadSignBoards = '[SignBoard] Load SignBoards',
  LoadSignBoardsSuccess = '[SignBoard] Load SignBoards Success',
  SelectSignBoard = '[SignBoard] Select SignBoard',
  LoadSignBoardsFailure = '[SignBoard] Load SignBoards Failure',
  AddSignBoard = '[SignBoard] Add SignBoard',
  AddSignBoardSuccess = '[SignBoard] Add SignBoard Success',
  AddSignBoardFailure = '[SignBoard] Add SignBoard Failure',
  UpsertSignBoard = '[SignBoard] Upsert SignBoard',
  AddSignBoards = '[SignBoard] Add SignBoards',
  UpsertSignBoards = '[SignBoard] Upsert SignBoards',
  UpdateSignBoard = '[SignBoard] Update SignBoard',
  UpdateSignBoardSuccess = '[SignBoard] Update SignBoard Success',
  UpdateSignBoardFailure = '[SignBoard] Update SignBoard Failure',
  UpdateSignBoards = '[SignBoard] Update SignBoards',
  DeleteSignBoard = '[SignBoard] Delete SignBoard',
  DeleteSignBoardSuccess = '[SignBoard] Delete SignBoard Success',
  DeleteSignBoardFailure = '[SignBoard] Delete SignBoard Failure',
  DeleteSignBoards = '[SignBoard] Delete SignBoards',
  ClearSignBoards = '[SignBoard] Clear SignBoards'
}

export class LoadSignBoards implements Action {
  readonly type = SignBoardActionTypes.LoadSignBoards;
}

export class LoadSignBoardsSuccess implements Action {
  readonly type = SignBoardActionTypes.LoadSignBoardsSuccess;
  constructor(public payload: { SignBoards: SignBoard[] }) { }
}

export class LoadSignBoardsFailure implements Action {
  readonly type = SignBoardActionTypes.LoadSignBoardsFailure;
  constructor(public payload: { error: any }) { }
}


export class AddSignBoard implements Action {
  readonly type = SignBoardActionTypes.AddSignBoard;

  constructor(public payload: { SignBoard: SignBoard }) {
  }
}

export class AddSignBoardSuccess implements Action {
  readonly type = SignBoardActionTypes.AddSignBoardSuccess;

  constructor(public payload: any) {
  }
}
export class AddSignBoardFailure implements Action {
  readonly type = SignBoardActionTypes.AddSignBoardFailure;

  constructor(public payload: any) {
  }
}

export class UpsertSignBoard implements Action {
  readonly type = SignBoardActionTypes.UpsertSignBoard;

  constructor(public payload: { SignBoard: SignBoard }) {
  }
}

export class AddSignBoards implements Action {
  readonly type = SignBoardActionTypes.AddSignBoards;

  constructor(public payload: { SignBoards: SignBoard[] }) {
  }
}

export class UpsertSignBoards implements Action {
  readonly type = SignBoardActionTypes.UpsertSignBoards;

  constructor(public payload: { SignBoards: SignBoard[] }) {
  }
}

export class UpdateSignBoard implements Action {
  readonly type = SignBoardActionTypes.UpdateSignBoard;

  constructor(public payload: any) {
  }
}

export class UpdateSignBoardSuccess implements Action {
  readonly type = SignBoardActionTypes.UpdateSignBoardSuccess;

  constructor(public payload: any) {
  }
}

export class UpdateSignBoardFailure implements Action {
  readonly type = SignBoardActionTypes.UpdateSignBoardFailure;

  constructor(public payload: any) {
  }
}

export class SelectSignBoard implements Action {
  readonly type = SignBoardActionTypes.SelectSignBoard;

  constructor(public payload: string) {
  }
}
export class UpdateSignBoards implements Action {
  readonly type = SignBoardActionTypes.UpdateSignBoards;

  constructor(public payload: { SignBoards: Update<SignBoard>[] }) {
  }
}

export class DeleteSignBoard implements Action {
  readonly type = SignBoardActionTypes.DeleteSignBoard;

  constructor(public payload: { id: string }) {
  }
}


export class DeleteSignBoardSuccess implements Action {
  readonly type = SignBoardActionTypes.DeleteSignBoardSuccess;

  constructor(public payload: any) {
  }
}


export class DeleteSignBoardFailure implements Action {
  readonly type = SignBoardActionTypes.DeleteSignBoardFailure;

  constructor(public payload: any) {
  }
}

export class DeleteSignBoards implements Action {
  readonly type = SignBoardActionTypes.DeleteSignBoards;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearSignBoards implements Action {
  readonly type = SignBoardActionTypes.ClearSignBoards;
}

export class GetSignBoards implements Action {
  readonly type = SignBoardActionTypes.Get;
}

export class DoneLoagingSignBoards implements Action {
  readonly type = SignBoardActionTypes.DoneLoading;
}

export type SignBoardActions =
  LoadSignBoards
  | LoadSignBoardsSuccess
  | AddSignBoardFailure
  | AddSignBoard
  | AddSignBoardSuccess
  | UpsertSignBoard
  | AddSignBoards
  | SelectSignBoard
  | UpsertSignBoards
  | UpdateSignBoard
  | UpdateSignBoardSuccess
  | UpdateSignBoardFailure
  | UpdateSignBoards
  | DeleteSignBoard
  | DeleteSignBoardSuccess
  | DeleteSignBoardFailure
  | DeleteSignBoards
  | ClearSignBoards
  | GetSignBoards
  | DoneLoagingSignBoards;
