import { Action } from '@ngrx/store';
import { SignBoardBatch } from '../reducers/sign-board-batch';
import { Update } from '@ngrx/entity';

export enum SignBoardBatchActionTypes {
  Get = '[SignBoardBatch] Get SignBoardBatches',
  DoneLoading = '[SignBoardBatch] Done Loading SignBoardBatches',
  LoadSignBoardBatches = '[SignBoardBatch] Load SignBoardBatches',
  LoadSignBoardBatchesSuccess = '[SignBoardBatch] Load SignBoardBatches Success',
  SelectSignBoardBatch = '[SignBoardBatch] Select SignBoardBatch',
  LoadSignBoardBatchesFailure = '[SignBoardBatch] Load SignBoardBatches Failure',
  AddSignBoardBatch = '[SignBoardBatch] Add SignBoardBatch',
  AddSignBoardBatchSuccess = '[SignBoardBatch] Add SignBoardBatch Success',
  AddSignBoardBatchFailure = '[SignBoardBatch] Add SignBoardBatch Failure',
  UpsertSignBoardBatch = '[SignBoardBatch] Upsert SignBoardBatch',
  AddSignBoardBatches = '[SignBoardBatch] Add SignBoardBatches',
  UpsertSignBoardBatches = '[SignBoardBatch] Upsert SignBoardBatches',
  UpdateSignBoardBatch = '[SignBoardBatch] Update SignBoardBatch',
  UpdateSignBoardBatchSuccess = '[SignBoardBatch] Update SignBoardBatch Success',
  UpdateSignBoardBatchFailure = '[SignBoardBatch] Update SignBoardBatch Failure',
  UpdateSignBoardBatches = '[SignBoardBatch] Update SignBoardBatches',
  DeleteSignBoardBatch = '[SignBoardBatch] Delete SignBoardBatch',
  DeleteSignBoardBatchSuccess = '[SignBoardBatch] Delete SignBoardBatch Success',
  DeleteSignBoardBatchFailure = '[SignBoardBatch] Delete SignBoardBatch Failure',
  DeleteSignBoardBatches = '[SignBoardBatch] Delete SignBoardBatches',
  ClearSignBoardBatches = '[SignBoardBatch] Clear SignBoardBatches'
}

export class LoadSignBoardBatches implements Action {
  readonly type = SignBoardBatchActionTypes.LoadSignBoardBatches;
}

export class LoadSignBoardBatchesSuccess implements Action {
  readonly type = SignBoardBatchActionTypes.LoadSignBoardBatchesSuccess;
  constructor(public payload: { SignBoardBatches: SignBoardBatch[] }) { }
}

export class LoadSignBoardBatchesFailure implements Action {
  readonly type = SignBoardBatchActionTypes.LoadSignBoardBatchesFailure;
  constructor(public payload: { error: any }) { }
}


export class AddSignBoardBatch implements Action {
  readonly type = SignBoardBatchActionTypes.AddSignBoardBatch;

  constructor(public payload: { SignBoardBatch: SignBoardBatch }) {
  }
}

export class AddSignBoardBatchSuccess implements Action {
  readonly type = SignBoardBatchActionTypes.AddSignBoardBatchSuccess;

  constructor(public payload: any) {
  }
}
export class AddSignBoardBatchFailure implements Action {
  readonly type = SignBoardBatchActionTypes.AddSignBoardBatchFailure;

  constructor(public payload: any) {
  }
}

export class UpsertSignBoardBatch implements Action {
  readonly type = SignBoardBatchActionTypes.UpsertSignBoardBatch;

  constructor(public payload: { SignBoardBatch: SignBoardBatch }) {
  }
}

export class AddSignBoardBatches implements Action {
  readonly type = SignBoardBatchActionTypes.AddSignBoardBatches;

  constructor(public payload: { SignBoardBatches: SignBoardBatch[] }) {
  }
}

export class UpsertSignBoardBatches implements Action {
  readonly type = SignBoardBatchActionTypes.UpsertSignBoardBatches;

  constructor(public payload: { SignBoardBatches: SignBoardBatch[] }) {
  }
}

export class UpdateSignBoardBatch implements Action {
  readonly type = SignBoardBatchActionTypes.UpdateSignBoardBatch;

  constructor(public payload: any) {
  }
}

export class UpdateSignBoardBatchSuccess implements Action {
  readonly type = SignBoardBatchActionTypes.UpdateSignBoardBatchSuccess;

  constructor(public payload: any) {
  }
}

export class UpdateSignBoardBatchFailure implements Action {
  readonly type = SignBoardBatchActionTypes.UpdateSignBoardBatchFailure;

  constructor(public payload: any) {
  }
}

export class SelectSignBoardBatch implements Action {
  readonly type = SignBoardBatchActionTypes.SelectSignBoardBatch;

  constructor(public payload: string) {
  }
}
export class UpdateSignBoardBatches implements Action {
  readonly type = SignBoardBatchActionTypes.UpdateSignBoardBatches;

  constructor(public payload: { SignBoardBatches: Update<SignBoardBatch>[] }) {
  }
}

export class DeleteSignBoardBatch implements Action {
  readonly type = SignBoardBatchActionTypes.DeleteSignBoardBatch;

  constructor(public payload: { id: string }) {
  }
}


export class DeleteSignBoardBatchSuccess implements Action {
  readonly type = SignBoardBatchActionTypes.DeleteSignBoardBatchSuccess;

  constructor(public payload: any) {
  }
}


export class DeleteSignBoardBatchFailure implements Action {
  readonly type = SignBoardBatchActionTypes.DeleteSignBoardBatchFailure;

  constructor(public payload: any) {
  }
}

export class DeleteSignBoardBatches implements Action {
  readonly type = SignBoardBatchActionTypes.DeleteSignBoardBatches;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearSignBoardBatches implements Action {
  readonly type = SignBoardBatchActionTypes.ClearSignBoardBatches;
}

export class GetSignBoardBatches implements Action {
  readonly type = SignBoardBatchActionTypes.Get;
}

export class DoneLoagingSignBoardBatches implements Action {
  readonly type = SignBoardBatchActionTypes.DoneLoading;
}

export type SignBoardBatchActions =
  LoadSignBoardBatches
  | LoadSignBoardBatchesSuccess
  | AddSignBoardBatchFailure
  | AddSignBoardBatch
  | AddSignBoardBatchSuccess
  | UpsertSignBoardBatch
  | AddSignBoardBatches
  | SelectSignBoardBatch
  | UpsertSignBoardBatches
  | UpdateSignBoardBatch
  | UpdateSignBoardBatchSuccess
  | UpdateSignBoardBatchFailure
  | UpdateSignBoardBatches
  | DeleteSignBoardBatch
  | DeleteSignBoardBatchSuccess
  | DeleteSignBoardBatchFailure
  | DeleteSignBoardBatches
  | ClearSignBoardBatches
  | GetSignBoardBatches
  | DoneLoagingSignBoardBatches;
