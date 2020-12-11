import { Action } from '@ngrx/store';
import { Application } from '../reducers/application';
import { Update } from '@ngrx/entity';

export enum ApplicationActionTypes {
  Get = '[Application] Get Applications',
  DoneLoading = '[Application] Done Loading Applications',
  LoadApplications = '[Application] Load Applications',
  LoadApplicationsSuccess = '[Application] Load Applications Success',
  SelectApplication = '[Application] Select Application',
  LoadApplicationsFailure = '[Application] Load Applications Failure',
  AddApplication = '[Application] Add Application',
  AddApplicationSuccess = '[Application] Add Application Success',
  AddApplicationFailure = '[Application] Add Application Failure',
  UpsertApplication = '[Application] Upsert Application',
  AddApplications = '[Application] Add Applications',
  UpsertApplications = '[Application] Upsert Applications',
  UpdateApplication = '[Application] Update Application',
  UpdateApplicationSuccess = '[Application] Update Application Success',
  UpdateApplicationFailure = '[Application] Update Application Failure',
  UpdateApplications = '[Application] Update Applications',
  DeleteApplication = '[Application] Delete Application',
  DeleteApplicationSuccess = '[Application] Delete Application Success',
  DeleteApplicationFailure = '[Application] Delete Application Failure',
  DeleteApplications = '[Application] Delete Applications',
  ClearApplications = '[Application] Clear Applications'
}

export class LoadApplications implements Action {
  readonly type = ApplicationActionTypes.LoadApplications;
}

export class LoadApplicationsSuccess implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationsSuccess;
  constructor(public payload: { Applications: Application[] }) { }
}

export class LoadApplicationsFailure implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationsFailure;
  constructor(public payload: { error: any }) { }
}


export class AddApplication implements Action {
  readonly type = ApplicationActionTypes.AddApplication;

  constructor(public payload: { Application: Application }) {
  }
}

export class AddApplicationSuccess implements Action {
  readonly type = ApplicationActionTypes.AddApplicationSuccess;

  constructor(public payload: any) {
  }
}
export class AddApplicationFailure implements Action {
  readonly type = ApplicationActionTypes.AddApplicationFailure;

  constructor(public payload: any) {
  }
}

export class UpsertApplication implements Action {
  readonly type = ApplicationActionTypes.UpsertApplication;

  constructor(public payload: { Application: Application }) {
  }
}

export class AddApplications implements Action {
  readonly type = ApplicationActionTypes.AddApplications;

  constructor(public payload: { Applications: Application[] }) {
  }
}

export class UpsertApplications implements Action {
  readonly type = ApplicationActionTypes.UpsertApplications;

  constructor(public payload: { Applications: Application[] }) {
  }
}

export class UpdateApplication implements Action {
  readonly type = ApplicationActionTypes.UpdateApplication;

  constructor(public payload: any) {
  }
}

export class UpdateApplicationSuccess implements Action {
  readonly type = ApplicationActionTypes.UpdateApplicationSuccess;

  constructor(public payload: any) {
  }
}

export class UpdateApplicationFailure implements Action {
  readonly type = ApplicationActionTypes.UpdateApplicationFailure;

  constructor(public payload: any) {
  }
}

export class SelectApplication implements Action {
  readonly type = ApplicationActionTypes.SelectApplication;

  constructor(public payload: string) {
  }
}
export class UpdateApplications implements Action {
  readonly type = ApplicationActionTypes.UpdateApplications;

  constructor(public payload: { Applications: Update<Application>[] }) {
  }
}

export class DeleteApplication implements Action {
  readonly type = ApplicationActionTypes.DeleteApplication;

  constructor(public payload: { id: string }) {
  }
}


export class DeleteApplicationSuccess implements Action {
  readonly type = ApplicationActionTypes.DeleteApplicationSuccess;

  constructor(public payload: any) {
  }
}


export class DeleteApplicationFailure implements Action {
  readonly type = ApplicationActionTypes.DeleteApplicationFailure;

  constructor(public payload: any) {
  }
}

export class DeleteApplications implements Action {
  readonly type = ApplicationActionTypes.DeleteApplications;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearApplications implements Action {
  readonly type = ApplicationActionTypes.ClearApplications;
}

export class GetApplications implements Action {
  readonly type = ApplicationActionTypes.Get;
}

export class DoneLoagingApplications implements Action {
  readonly type = ApplicationActionTypes.DoneLoading;
}

export type ApplicationActions =
  LoadApplications
  | LoadApplicationsSuccess
  | AddApplicationFailure
  | AddApplication
  | AddApplicationSuccess
  | UpsertApplication
  | AddApplications
  | SelectApplication
  | UpsertApplications
  | UpdateApplication
  | UpdateApplicationSuccess
  | UpdateApplicationFailure
  | UpdateApplications
  | DeleteApplication
  | DeleteApplicationSuccess
  | DeleteApplicationFailure
  | DeleteApplications
  | ClearApplications
  | GetApplications
  | DoneLoagingApplications;
