import { Action } from '@ngrx/store';
import { Outlet } from '../reducers/outlet';
import { Update } from '@ngrx/entity';

export enum OutletActionTypes {
  Get = '[Outlet] Get Outlets',
  DoneLoadingOutlets = '[Outlet] Done Loading Outlets',
  LoadOutlets = '[Outlet] Load Outlets',
  LoadOutletsSuccess = '[Outlet] Load Outlets Success',
  SelectOutlet = '[Outlet] Select Outlet',
  LoadOutletsFailure = '[Outlet] Load Outlets Failure',
  AddOutlet = '[Outlet] Add Outlet',
  AddOutletSuccess = '[Outlet] Add Outlet Success',
  AddOutletFailure = '[Outlet] Add Outlet Failure',
  UpsertOutlet = '[Outlet] Upsert Outlet',
  AddOutlets = '[Outlet] Add Outlets',
  UpsertOutlets = '[Outlet] Upsert Outlets',
  UpdateOutlet = '[Outlet] Update Outlet',
  UpdateOutletSuccess = '[Outlet] Update Outlet Success',
  UpdateOutletFailure = '[Outlet] Update Outlet Failure',
  UpdateOutlets = '[Outlet] Update Outlets',
  DeleteOutlet = '[Outlet] Delete Outlet',
  DeleteOutletSuccess = '[Outlet] Delete Outlet Success',
  DeleteOutletFailure = '[Outlet] Delete Outlet Failure',
  DeleteOutlets = '[Outlet] Delete Outlets',
  ClearOutlets = '[Outlet] Clear Outlets'
}

export class LoadOutlets implements Action {
  readonly type = OutletActionTypes.LoadOutlets;
}

export class LoadOutletsSuccess implements Action {
  readonly type = OutletActionTypes.LoadOutletsSuccess;
  constructor(public payload: { Outlets: Outlet[] }) { }
}

export class LoadOutletsFailure implements Action {
  readonly type = OutletActionTypes.LoadOutletsFailure;
  constructor(public payload: { error: any }) { }
}


export class AddOutlet implements Action {
  readonly type = OutletActionTypes.AddOutlet;

  constructor(public payload: { Outlet: Outlet }) {
  }
}

export class AddOutletSuccess implements Action {
  readonly type = OutletActionTypes.AddOutletSuccess;

  constructor(public payload: any) {
  }
}
export class AddOutletFailure implements Action {
  readonly type = OutletActionTypes.AddOutletFailure;

  constructor(public payload: any) {
  }
}

export class UpsertOutlet implements Action {
  readonly type = OutletActionTypes.UpsertOutlet;

  constructor(public payload: { Outlet: Outlet }) {
  }
}

export class AddOutlets implements Action {
  readonly type = OutletActionTypes.AddOutlets;

  constructor(public payload: { Outlets: Outlet[] }) {
  }
}

export class UpsertOutlets implements Action {
  readonly type = OutletActionTypes.UpsertOutlets;

  constructor(public payload: { Outlets: Outlet[] }) {
  }
}

export class UpdateOutlet implements Action {
  readonly type = OutletActionTypes.UpdateOutlet;

  constructor(public payload: any) {
  }
}

export class UpdateOutletSuccess implements Action {
  readonly type = OutletActionTypes.UpdateOutletSuccess;

  constructor(public payload: any) {
  }
}

export class UpdateOutletFailure implements Action {
  readonly type = OutletActionTypes.UpdateOutletFailure;

  constructor(public payload: any) {
  }
}

export class SelectOutlet implements Action {
  readonly type = OutletActionTypes.SelectOutlet;

  constructor(public payload: string) {
  }
}
export class UpdateOutlets implements Action {
  readonly type = OutletActionTypes.UpdateOutlets;

  constructor(public payload: { Outlets: Update<Outlet>[] }) {
  }
}

export class DeleteOutlet implements Action {
  readonly type = OutletActionTypes.DeleteOutlet;

  constructor(public payload: { id: string }) {
  }
}


export class DeleteOutletSuccess implements Action {
  readonly type = OutletActionTypes.DeleteOutletSuccess;

  constructor(public payload: any) {
  }
}


export class DeleteOutletFailure implements Action {
  readonly type = OutletActionTypes.DeleteOutletFailure;

  constructor(public payload: any) {
  }
}

export class DeleteOutlets implements Action {
  readonly type = OutletActionTypes.DeleteOutlets;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearOutlets implements Action {
  readonly type = OutletActionTypes.ClearOutlets;
}

export class GetOutlets implements Action {
  readonly type = OutletActionTypes.Get;
}

export class DoneLoadingOutlets implements Action {
  readonly type = OutletActionTypes.DoneLoadingOutlets;
}

export type OutletActions =
  LoadOutlets
  | LoadOutletsSuccess
  | LoadOutletsFailure
  | DoneLoadingOutlets
  | AddOutletFailure
  | AddOutlet
  | AddOutletSuccess
  | UpsertOutlet
  | AddOutlets
  | SelectOutlet
  | UpsertOutlets
  | UpdateOutlet
  | UpdateOutletSuccess
  | UpdateOutletFailure
  | UpdateOutlets
  | DeleteOutlet
  | DeleteOutletSuccess
  | DeleteOutletFailure
  | DeleteOutlets
  | ClearOutlets
  | GetOutlets;
