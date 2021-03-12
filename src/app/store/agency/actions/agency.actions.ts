import { Action } from '@ngrx/store';
import { Agency } from '../reducers/agency';
import { Update } from '@ngrx/entity';

export enum AgencyActionTypes {
  Get = '[Agency] Get Agencies',
  DoneLoadingAgencies = '[Agency] Done Loading Agencies',
  LoadAgencies = '[Agency] Load Agencies',

  LoadAgenciesSuccess = '[Agency] Load Agencies Success',
  SelectAgency = '[Agency] Select Agency',
  LoadAgenciesFailure = '[Agency] Load Agencies Failure',
  AddAgency = '[Agency] Add Agency',
  AddAgencySuccess = '[Agency] Add Agency Success',
  AddAgencyFailure = '[Agency] Add Agency Failure',
  UpsertAgency = '[Agency] Upsert Agency',
  AddAgencies = '[Agency] Add Agencies',
  UpsertAgencies = '[Agency] Upsert Agencies',
  UpdateAgency = '[Agency] Update Agency',
  UpdateAgencySuccess = '[Agency] Update Agency Success',
  UpdateAgencyFailure = '[Agency] Update Agency Failure',
  UpdateAgencies = '[Agency] Update Agencies',
  DeleteAgency = '[Agency] Delete Agency',
  DeleteAgencySuccess = '[Agency] Delete Agency Success',
  DeleteAgencyFailure = '[Agency] Delete Agency Failure',
  DeleteAgencies = '[Agency] Delete Agencies',
  ClearAgencies = '[Agency] Clear Agencies'
}

export class LoadAgencies implements Action {
  readonly type = AgencyActionTypes.LoadAgencies;
}

export class LoadAgenciesSuccess implements Action {
  readonly type = AgencyActionTypes.LoadAgenciesSuccess;
  constructor(public payload: { Agencies: Agency[] }) { }
}

export class LoadAgenciesFailure implements Action {
  readonly type = AgencyActionTypes.LoadAgenciesFailure;
  constructor(public payload: { error: any }) { }
}


export class AddAgency implements Action {
  readonly type = AgencyActionTypes.AddAgency;

  constructor(public payload: { Agency: Agency }) {
  }
}

export class AddAgencySuccess implements Action {
  readonly type = AgencyActionTypes.AddAgencySuccess;

  constructor(public payload: any) {
  }
}
export class AddAgencyFailure implements Action {
  readonly type = AgencyActionTypes.AddAgencyFailure;

  constructor(public payload: any) {
  }
}

export class UpsertAgency implements Action {
  readonly type = AgencyActionTypes.UpsertAgency;

  constructor(public payload: { Agency: Agency }) {
  }
}

export class AddAgencies implements Action {
  readonly type = AgencyActionTypes.AddAgencies;

  constructor(public payload: { Agencies: Agency[] }) {
  }
}

export class UpsertAgencies implements Action {
  readonly type = AgencyActionTypes.UpsertAgencies;

  constructor(public payload: { Agencies: Agency[] }) {
  }
}

export class UpdateAgency implements Action {
  readonly type = AgencyActionTypes.UpdateAgency;

  constructor(public payload: any) {
  }
}

export class UpdateAgencySuccess implements Action {
  readonly type = AgencyActionTypes.UpdateAgencySuccess;

  constructor(public payload: any) {
  }
}

export class UpdateAgencyFailure implements Action {
  readonly type = AgencyActionTypes.UpdateAgencyFailure;

  constructor(public payload: any) {
  }
}

export class SelectAgency implements Action {
  readonly type = AgencyActionTypes.SelectAgency;

  constructor(public payload: string) {
  }
}
export class UpdateAgencies implements Action {
  readonly type = AgencyActionTypes.UpdateAgencies;

  constructor(public payload: { Agencies: Update<Agency>[] }) {
  }
}

export class DeleteAgency implements Action {
  readonly type = AgencyActionTypes.DeleteAgency;

  constructor(public payload: { id: string }) {
  }
}


export class DeleteAgencySuccess implements Action {
  readonly type = AgencyActionTypes.DeleteAgencySuccess;

  constructor(public payload: any) {
  }
}


export class DeleteAgencyFailure implements Action {
  readonly type = AgencyActionTypes.DeleteAgencyFailure;

  constructor(public payload: any) {
  }
}

export class DeleteAgencies implements Action {
  readonly type = AgencyActionTypes.DeleteAgencies;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearAgencies implements Action {
  readonly type = AgencyActionTypes.ClearAgencies;
}

export class GetAgencies implements Action {
  readonly type = AgencyActionTypes.Get;
}

export class DoneLoadingAgencies implements Action {
  readonly type = AgencyActionTypes.DoneLoadingAgencies;
}

export type AgencyActions =
  LoadAgencies
  | LoadAgenciesSuccess
  |LoadAgenciesFailure
  | AddAgencyFailure
  | AddAgency
  | AddAgencySuccess
  | UpsertAgency
  | AddAgencies
  | SelectAgency
  | UpsertAgencies
  | UpdateAgency
  | UpdateAgencySuccess
  | UpdateAgencyFailure
  | UpdateAgencies
  | DeleteAgency
  | DeleteAgencySuccess
  | DeleteAgencyFailure
  | DeleteAgencies
  | ClearAgencies
  | GetAgencies
  | DoneLoadingAgencies;
