import { Action } from '@ngrx/store';
import { AssignedBoardBatch } from '../reducers/assigned-board-batch';
import { Update } from '@ngrx/entity';

export enum AssignedBoardBatchActionTypes {
  Get = '[AssignedBoardBatch] Get AssignedBoardBatches',

  DoneLoadingAssignedBoardBatches = '[AssignedBoardBatch] Done Loading AssignedBoardBatches',
  LoadAssignedBoardBatches = '[AssignedBoardBatch] Load AssignedBoardBatches',
  LoadAssignedBoardBatchesSuccess = '[AssignedBoardBatch] Load AssignedBoardBatches Success',
  SelectAssignedBoardBatch = '[AssignedBoardBatch] Select AssignedBoardBatch',
  LoadAssignedBoardBatchesFailure = '[AssignedBoardBatch] Load AssignedBoardBatches Failure',
  AddAssignedBoardBatch = '[AssignedBoardBatch] Add AssignedBoardBatch',
  AddAssignedBoardBatchSuccess = '[AssignedBoardBatch] Add AssignedBoardBatch Success',
  AddAssignedBoardBatchFailure = '[AssignedBoardBatch] Add AssignedBoardBatch Failure',
  UpsertAssignedBoardBatch = '[AssignedBoardBatch] Upsert AssignedBoardBatch',
  AddAssignedBoardBatches = '[AssignedBoardBatch] Add AssignedBoardBatches',
  UpsertAssignedBoardBatches = '[AssignedBoardBatch] Upsert AssignedBoardBatches',
  UpdateAssignedBoardBatch = '[AssignedBoardBatch] Update AssignedBoardBatch',
  UpdateAssignedBoardBatchSuccess = '[AssignedBoardBatch] Update AssignedBoardBatch Success',
  UpdateAssignedBoardBatchFailure = '[AssignedBoardBatch] Update AssignedBoardBatch Failure',
  UpdateAssignedBoardBatches = '[AssignedBoardBatch] Update AssignedBoardBatches',
  DeleteAssignedBoardBatch = '[AssignedBoardBatch] Delete AssignedBoardBatch',
  DeleteAssignedBoardBatchSuccess = '[AssignedBoardBatch] Delete AssignedBoardBatch Success',
  DeleteAssignedBoardBatchFailure = '[AssignedBoardBatch] Delete AssignedBoardBatch Failure',
  DeleteAssignedBoardBatches = '[AssignedBoardBatch] Delete AssignedBoardBatches',
  ClearAssignedBoardBatches = '[AssignedBoardBatch] Clear AssignedBoardBatches'
}

export class LoadAssignedBoardBatches implements Action {
  readonly type = AssignedBoardBatchActionTypes.LoadAssignedBoardBatches;
}

export class LoadAssignedBoardBatchesSuccess implements Action {
  readonly type = AssignedBoardBatchActionTypes.LoadAssignedBoardBatchesSuccess;
  constructor(public payload: { AssignedBoardBatches: AssignedBoardBatch[] }) { }
}

export class LoadAssignedBoardBatchesFailure implements Action {
  readonly type = AssignedBoardBatchActionTypes.LoadAssignedBoardBatchesFailure;
  constructor(public payload: { error: any }) { }
}


export class AddAssignedBoardBatch implements Action {
  readonly type = AssignedBoardBatchActionTypes.AddAssignedBoardBatch;

  constructor(public payload: { AssignedBoardBatch: AssignedBoardBatch }) {
  }
}

export class AddAssignedBoardBatchSuccess implements Action {
  readonly type = AssignedBoardBatchActionTypes.AddAssignedBoardBatchSuccess;

  constructor(public payload: any) {
  }
}
export class AddAssignedBoardBatchFailure implements Action {
  readonly type = AssignedBoardBatchActionTypes.AddAssignedBoardBatchFailure;

  constructor(public payload: any) {
  }
}

export class UpsertAssignedBoardBatch implements Action {
  readonly type = AssignedBoardBatchActionTypes.UpsertAssignedBoardBatch;

  constructor(public payload: { AssignedBoardBatch: AssignedBoardBatch }) {
  }
}

export class AddAssignedBoardBatches implements Action {
  readonly type = AssignedBoardBatchActionTypes.AddAssignedBoardBatches;

  constructor(public payload: { AssignedBoardBatches: AssignedBoardBatch[] }) {
  }
}

export class UpsertAssignedBoardBatches implements Action {
  readonly type = AssignedBoardBatchActionTypes.UpsertAssignedBoardBatches;

  constructor(public payload: { AssignedBoardBatches: AssignedBoardBatch[] }) {
  }
}

export class UpdateAssignedBoardBatch implements Action {
  readonly type = AssignedBoardBatchActionTypes.UpdateAssignedBoardBatch;

  constructor(public payload: any) {
  }
}

export class UpdateAssignedBoardBatchSuccess implements Action {
  readonly type = AssignedBoardBatchActionTypes.UpdateAssignedBoardBatchSuccess;

  constructor(public payload: any) {
  }
}

export class UpdateAssignedBoardBatchFailure implements Action {
  readonly type = AssignedBoardBatchActionTypes.UpdateAssignedBoardBatchFailure;

  constructor(public payload: any) {
  }
}

export class SelectAssignedBoardBatch implements Action {
  readonly type = AssignedBoardBatchActionTypes.SelectAssignedBoardBatch;

  constructor(public payload: string) {
  }
}
export class UpdateAssignedBoardBatches implements Action {
  readonly type = AssignedBoardBatchActionTypes.UpdateAssignedBoardBatches;

  constructor(public payload: { AssignedBoardBatches: Update<AssignedBoardBatch>[] }) {
  }
}

export class DeleteAssignedBoardBatch implements Action {
  readonly type = AssignedBoardBatchActionTypes.DeleteAssignedBoardBatch;

  constructor(public payload: { id: string }) {
  }
}


export class DeleteAssignedBoardBatchSuccess implements Action {
  readonly type = AssignedBoardBatchActionTypes.DeleteAssignedBoardBatchSuccess;

  constructor(public payload: any) {
  }
}


export class DeleteAssignedBoardBatchFailure implements Action {
  readonly type = AssignedBoardBatchActionTypes.DeleteAssignedBoardBatchFailure;

  constructor(public payload: any) {
  }
}

export class DeleteAssignedBoardBatches implements Action {
  readonly type = AssignedBoardBatchActionTypes.DeleteAssignedBoardBatches;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearAssignedBoardBatches implements Action {
  readonly type = AssignedBoardBatchActionTypes.ClearAssignedBoardBatches;
}

export class GetAssignedBoardBatches implements Action {
  readonly type = AssignedBoardBatchActionTypes.Get;
}

export class DoneLoadingAssignedBoardBatches implements Action {
  readonly type = AssignedBoardBatchActionTypes.DoneLoadingAssignedBoardBatches;
}

export type AssignedBoardBatchActions =
  LoadAssignedBoardBatches
  | LoadAssignedBoardBatchesSuccess
  | AddAssignedBoardBatchFailure
  | AddAssignedBoardBatch
  | AddAssignedBoardBatchSuccess
  | UpsertAssignedBoardBatch
  | AddAssignedBoardBatches
  | SelectAssignedBoardBatch
  | UpsertAssignedBoardBatches
  | UpdateAssignedBoardBatch
  | UpdateAssignedBoardBatchSuccess
  | UpdateAssignedBoardBatchFailure
  | UpdateAssignedBoardBatches
  | DeleteAssignedBoardBatch
  | DeleteAssignedBoardBatchSuccess
  | DeleteAssignedBoardBatchFailure
  | DeleteAssignedBoardBatches
  | ClearAssignedBoardBatches
  | GetAssignedBoardBatches
  | DoneLoadingAssignedBoardBatches;
