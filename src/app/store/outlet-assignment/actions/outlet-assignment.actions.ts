import { Action } from '@ngrx/store';
import { OutletAssignment } from '../reducers/outlet-assignment';
import { Update } from '@ngrx/entity';

export enum OutletAssignmentActionTypes {
  Get = '[OutletAssignment] Get OutletAssignments',

  DoneLoadingOutletAssignments = '[OutletAssignment] Done Loading OutletAssignments',
  LoadOutletAssignments = '[OutletAssignment] Load OutletAssignments',
  LoadOutletAssignmentsSuccess = '[OutletAssignment] Load OutletAssignments Success',
  SelectOutletAssignment = '[OutletAssignment] Select OutletAssignment',
  LoadOutletAssignmentsFailure = '[OutletAssignment] Load OutletAssignments Failure',
  AddOutletAssignment = '[OutletAssignment] Add OutletAssignment',
  AddOutletAssignmentSuccess = '[OutletAssignment] Add OutletAssignment Success',
  AddOutletAssignmentFailure = '[OutletAssignment] Add OutletAssignment Failure',
  UpsertOutletAssignment = '[OutletAssignment] Upsert OutletAssignment',
  AddOutletAssignments = '[OutletAssignment] Add OutletAssignments',
  UpsertOutletAssignments = '[OutletAssignment] Upsert OutletAssignments',
  UpdateOutletAssignment = '[OutletAssignment] Update OutletAssignment',
  UpdateOutletAssignmentSuccess = '[OutletAssignment] Update OutletAssignment Success',
  UpdateOutletAssignmentFailure = '[OutletAssignment] Update OutletAssignment Failure',
  UpdateOutletAssignments = '[OutletAssignment] Update OutletAssignments',
  DeleteOutletAssignment = '[OutletAssignment] Delete OutletAssignment',
  DeleteOutletAssignmentSuccess = '[OutletAssignment] Delete OutletAssignment Success',
  DeleteOutletAssignmentFailure = '[OutletAssignment] Delete OutletAssignment Failure',
  DeleteOutletAssignments = '[OutletAssignment] Delete OutletAssignments',
  ClearOutletAssignments = '[OutletAssignment] Clear OutletAssignments'
}

export class LoadOutletAssignments implements Action {
  readonly type = OutletAssignmentActionTypes.LoadOutletAssignments;
}

export class LoadOutletAssignmentsSuccess implements Action {
  readonly type = OutletAssignmentActionTypes.LoadOutletAssignmentsSuccess;
  constructor(public payload: { OutletAssignments: OutletAssignment[] }) { }
}

export class LoadOutletAssignmentsFailure implements Action {
  readonly type = OutletAssignmentActionTypes.LoadOutletAssignmentsFailure;
  constructor(public payload: { error: any }) { }
}


export class AddOutletAssignment implements Action {
  readonly type = OutletAssignmentActionTypes.AddOutletAssignment;

  constructor(public payload: { OutletAssignment: OutletAssignment }) {
  }
}

export class AddOutletAssignmentSuccess implements Action {
  readonly type = OutletAssignmentActionTypes.AddOutletAssignmentSuccess;

  constructor(public payload: any) {
  }
}
export class AddOutletAssignmentFailure implements Action {
  readonly type = OutletAssignmentActionTypes.AddOutletAssignmentFailure;

  constructor(public payload: any) {
  }
}

export class UpsertOutletAssignment implements Action {
  readonly type = OutletAssignmentActionTypes.UpsertOutletAssignment;

  constructor(public payload: { OutletAssignment: OutletAssignment }) {
  }
}

export class AddOutletAssignments implements Action {
  readonly type = OutletAssignmentActionTypes.AddOutletAssignments;

  constructor(public payload: { OutletAssignments: OutletAssignment[] }) {
  }
}

export class UpsertOutletAssignments implements Action {
  readonly type = OutletAssignmentActionTypes.UpsertOutletAssignments;

  constructor(public payload: { OutletAssignments: OutletAssignment[] }) {
  }
}

export class UpdateOutletAssignment implements Action {
  readonly type = OutletAssignmentActionTypes.UpdateOutletAssignment;

  constructor(public payload: any) {
  }
}

export class UpdateOutletAssignmentSuccess implements Action {
  readonly type = OutletAssignmentActionTypes.UpdateOutletAssignmentSuccess;

  constructor(public payload: any) {
  }
}

export class UpdateOutletAssignmentFailure implements Action {
  readonly type = OutletAssignmentActionTypes.UpdateOutletAssignmentFailure;

  constructor(public payload: any) {
  }
}

export class SelectOutletAssignment implements Action {
  readonly type = OutletAssignmentActionTypes.SelectOutletAssignment;

  constructor(public payload: string) {
  }
}
export class UpdateOutletAssignments implements Action {
  readonly type = OutletAssignmentActionTypes.UpdateOutletAssignments;

  constructor(public payload: { OutletAssignments: Update<OutletAssignment>[] }) {
  }
}

export class DeleteOutletAssignment implements Action {
  readonly type = OutletAssignmentActionTypes.DeleteOutletAssignment;

  constructor(public payload: { id: string }) {
  }
}


export class DeleteOutletAssignmentSuccess implements Action {
  readonly type = OutletAssignmentActionTypes.DeleteOutletAssignmentSuccess;

  constructor(public payload: any) {
  }
}


export class DeleteOutletAssignmentFailure implements Action {
  readonly type = OutletAssignmentActionTypes.DeleteOutletAssignmentFailure;

  constructor(public payload: any) {
  }
}

export class DeleteOutletAssignments implements Action {
  readonly type = OutletAssignmentActionTypes.DeleteOutletAssignments;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearOutletAssignments implements Action {
  readonly type = OutletAssignmentActionTypes.ClearOutletAssignments;
}

export class GetOutletAssignments implements Action {
  readonly type = OutletAssignmentActionTypes.Get;
}

export class DoneLoadingOutletAssignments implements Action {
  readonly type = OutletAssignmentActionTypes.DoneLoadingOutletAssignments;
}

export type OutletAssignmentActions =
  LoadOutletAssignments
  | LoadOutletAssignmentsSuccess
  | AddOutletAssignmentFailure
  | AddOutletAssignment
  | AddOutletAssignmentSuccess
  | UpsertOutletAssignment
  | AddOutletAssignments
  | SelectOutletAssignment
  | UpsertOutletAssignments
  | UpdateOutletAssignment
  | UpdateOutletAssignmentSuccess
  | UpdateOutletAssignmentFailure
  | UpdateOutletAssignments
  | DeleteOutletAssignment
  | DeleteOutletAssignmentSuccess
  | DeleteOutletAssignmentFailure
  | DeleteOutletAssignments
  | ClearOutletAssignments
  | GetOutletAssignments
  | DoneLoadingOutletAssignments;
