import { Action } from '@ngrx/store';
import { SignBoardBatchItem } from '../reducers/sign-board-batch-item';
import { Update } from '@ngrx/entity';

export enum SignBoardBatchItemActionTypes {
  Get = '[SignBoardBatchItem] Get SignBoardBatchItems',
  DoneLoading = '[SignBoardBatchItem] Done Loading SignBoardBatchItems',
  LoadSignBoardBatchItems = '[SignBoardBatchItem] Load SignBoardBatchItems',
  LoadSignBoardBatchItemsSuccess = '[SignBoardBatchItem] Load SignBoardBatchItems Success',
  SelectSignBoardBatchItem = '[SignBoardBatchItem] Select SignBoardBatchItem',
  LoadSignBoardBatchItemsFailure = '[SignBoardBatchItem] Load SignBoardBatchItems Failure',
  AddSignBoardBatchItem = '[SignBoardBatchItem] Add SignBoardBatchItem',
  AddSignBoardBatchItemSuccess = '[SignBoardBatchItem] Add SignBoardBatchItem Success',
  AddSignBoardBatchItemFailure = '[SignBoardBatchItem] Add SignBoardBatchItem Failure',
  UpsertSignBoardBatchItem = '[SignBoardBatchItem] Upsert SignBoardBatchItem',
  AddSignBoardBatchItems = '[SignBoardBatchItem] Add SignBoardBatchItems',
  UpsertSignBoardBatchItems = '[SignBoardBatchItem] Upsert SignBoardBatchItems',
  UpdateSignBoardBatchItem = '[SignBoardBatchItem] Update SignBoardBatchItem',
  UpdateSignBoardBatchItemSuccess = '[SignBoardBatchItem] Update SignBoardBatchItem Success',
  UpdateSignBoardBatchItemFailure = '[SignBoardBatchItem] Update SignBoardBatchItem Failure',
  UpdateSignBoardBatchItems = '[SignBoardBatchItem] Update SignBoardBatchItems',
  DeleteSignBoardBatchItem = '[SignBoardBatchItem] Delete SignBoardBatchItem',
  DeleteSignBoardBatchItemSuccess = '[SignBoardBatchItem] Delete SignBoardBatchItem Success',
  DeleteSignBoardBatchItemFailure = '[SignBoardBatchItem] Delete SignBoardBatchItem Failure',
  DeleteSignBoardBatchItems = '[SignBoardBatchItem] Delete SignBoardBatchItems',
  ClearSignBoardBatchItems = '[SignBoardBatchItem] Clear SignBoardBatchItems'
}

export class LoadSignBoardBatchItems implements Action {
  readonly type = SignBoardBatchItemActionTypes.LoadSignBoardBatchItems;
}

export class LoadSignBoardBatchItemsSuccess implements Action {
  readonly type = SignBoardBatchItemActionTypes.LoadSignBoardBatchItemsSuccess;
  constructor(public payload: { SignBoardBatchItems: SignBoardBatchItem[] }) { }
}

export class LoadSignBoardBatchItemsFailure implements Action {
  readonly type = SignBoardBatchItemActionTypes.LoadSignBoardBatchItemsFailure;
  constructor(public payload: { error: any }) { }
}


export class AddSignBoardBatchItem implements Action {
  readonly type = SignBoardBatchItemActionTypes.AddSignBoardBatchItem;

  constructor(public payload: { SignBoardBatchItem: SignBoardBatchItem }) {
  }
}

export class AddSignBoardBatchItemSuccess implements Action {
  readonly type = SignBoardBatchItemActionTypes.AddSignBoardBatchItemSuccess;

  constructor(public payload: any) {
  }
}
export class AddSignBoardBatchItemFailure implements Action {
  readonly type = SignBoardBatchItemActionTypes.AddSignBoardBatchItemFailure;

  constructor(public payload: any) {
  }
}

export class UpsertSignBoardBatchItem implements Action {
  readonly type = SignBoardBatchItemActionTypes.UpsertSignBoardBatchItem;

  constructor(public payload: { SignBoardBatchItem: SignBoardBatchItem }) {
  }
}

export class AddSignBoardBatchItems implements Action {
  readonly type = SignBoardBatchItemActionTypes.AddSignBoardBatchItems;

  constructor(public payload: { SignBoardBatchItems: SignBoardBatchItem[] }) {
  }
}

export class UpsertSignBoardBatchItems implements Action {
  readonly type = SignBoardBatchItemActionTypes.UpsertSignBoardBatchItems;

  constructor(public payload: { SignBoardBatchItems: SignBoardBatchItem[] }) {
  }
}

export class UpdateSignBoardBatchItem implements Action {
  readonly type = SignBoardBatchItemActionTypes.UpdateSignBoardBatchItem;

  constructor(public payload: any) {
  }
}

export class UpdateSignBoardBatchItemSuccess implements Action {
  readonly type = SignBoardBatchItemActionTypes.UpdateSignBoardBatchItemSuccess;

  constructor(public payload: any) {
  }
}

export class UpdateSignBoardBatchItemFailure implements Action {
  readonly type = SignBoardBatchItemActionTypes.UpdateSignBoardBatchItemFailure;

  constructor(public payload: any) {
  }
}

export class SelectSignBoardBatchItem implements Action {
  readonly type = SignBoardBatchItemActionTypes.SelectSignBoardBatchItem;

  constructor(public payload: string) {
  }
}
export class UpdateSignBoardBatchItems implements Action {
  readonly type = SignBoardBatchItemActionTypes.UpdateSignBoardBatchItems;

  constructor(public payload: { SignBoardBatchItems: Update<SignBoardBatchItem>[] }) {
  }
}

export class DeleteSignBoardBatchItem implements Action {
  readonly type = SignBoardBatchItemActionTypes.DeleteSignBoardBatchItem;

  constructor(public payload: { id: string }) {
  }
}


export class DeleteSignBoardBatchItemSuccess implements Action {
  readonly type = SignBoardBatchItemActionTypes.DeleteSignBoardBatchItemSuccess;

  constructor(public payload: any) {
  }
}


export class DeleteSignBoardBatchItemFailure implements Action {
  readonly type = SignBoardBatchItemActionTypes.DeleteSignBoardBatchItemFailure;

  constructor(public payload: any) {
  }
}

export class DeleteSignBoardBatchItems implements Action {
  readonly type = SignBoardBatchItemActionTypes.DeleteSignBoardBatchItems;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearSignBoardBatchItems implements Action {
  readonly type = SignBoardBatchItemActionTypes.ClearSignBoardBatchItems;
}

export class GetSignBoardBatchItems implements Action {
  readonly type = SignBoardBatchItemActionTypes.Get;
}

export class DoneLoagingSignBoardBatchItems implements Action {
  readonly type = SignBoardBatchItemActionTypes.DoneLoading;
}

export type SignBoardBatchItemActions =
  LoadSignBoardBatchItems
  | LoadSignBoardBatchItemsSuccess
  | AddSignBoardBatchItemFailure
  | AddSignBoardBatchItem
  | AddSignBoardBatchItemSuccess
  | UpsertSignBoardBatchItem
  | AddSignBoardBatchItems
  | SelectSignBoardBatchItem
  | UpsertSignBoardBatchItems
  | UpdateSignBoardBatchItem
  | UpdateSignBoardBatchItemSuccess
  | UpdateSignBoardBatchItemFailure
  | UpdateSignBoardBatchItems
  | DeleteSignBoardBatchItem
  | DeleteSignBoardBatchItemSuccess
  | DeleteSignBoardBatchItemFailure
  | DeleteSignBoardBatchItems
  | ClearSignBoardBatchItems
  | GetSignBoardBatchItems
  | DoneLoagingSignBoardBatchItems;
