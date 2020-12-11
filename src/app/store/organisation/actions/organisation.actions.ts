import { Action } from '@ngrx/store';
import { Organisation } from '../reducers/organisation';
import { Update } from '@ngrx/entity';

export enum OrganisationActionTypes {
  Get = '[Organisation] Get Organisations',
  DoneLoading = '[Organisation] Done Loading Organisations',
  LoadOrganisations = '[Organisation] Load Organisations',
  LoadOrganisationsSuccess = '[Organisation] Load Organisations Success',
  SelectOrganisation = '[Organisation] Select Organisation',
  LoadOrganisationsFailure = '[Organisation] Load Organisations Failure',
  AddOrganisation = '[Organisation] Add Organisation',
  AddOrganisationSuccess = '[Organisation] Add Organisation Success',
  AddOrganisationFailure = '[Organisation] Add Organisation Failure',
  UpsertOrganisation = '[Organisation] Upsert Organisation',
  AddOrganisations = '[Organisation] Add Organisations',
  UpsertOrganisations = '[Organisation] Upsert Organisations',
  UpdateOrganisation = '[Organisation] Update Organisation',
  UpdateOrganisationSuccess = '[Organisation] Update Organisation Success',
  UpdateOrganisationFailure = '[Organisation] Update Organisation Failure',
  UpdateOrganisations = '[Organisation] Update Organisations',
  DeleteOrganisation = '[Organisation] Delete Organisation',
  DeleteOrganisationSuccess = '[Organisation] Delete Organisation Success',
  DeleteOrganisationFailure = '[Organisation] Delete Organisation Failure',
  DeleteOrganisations = '[Organisation] Delete Organisations',
  ClearOrganisations = '[Organisation] Clear Organisations'
}

export class LoadOrganisations implements Action {
  readonly type = OrganisationActionTypes.LoadOrganisations;
}

export class LoadOrganisationsSuccess implements Action {
  readonly type = OrganisationActionTypes.LoadOrganisationsSuccess;
  constructor(public payload: { Organisations: Organisation[] }) { }
}

export class LoadOrganisationsFailure implements Action {
  readonly type = OrganisationActionTypes.LoadOrganisationsFailure;
  constructor(public payload: { error: any }) { }
}


export class AddOrganisation implements Action {
  readonly type = OrganisationActionTypes.AddOrganisation;

  constructor(public payload: { Organisation: Organisation }) {
  }
}

export class AddOrganisationSuccess implements Action {
  readonly type = OrganisationActionTypes.AddOrganisationSuccess;

  constructor(public payload: any) {
  }
}
export class AddOrganisationFailure implements Action {
  readonly type = OrganisationActionTypes.AddOrganisationFailure;

  constructor(public payload: any) {
  }
}

export class UpsertOrganisation implements Action {
  readonly type = OrganisationActionTypes.UpsertOrganisation;

  constructor(public payload: { Organisation: Organisation }) {
  }
}

export class AddOrganisations implements Action {
  readonly type = OrganisationActionTypes.AddOrganisations;

  constructor(public payload: { Organisations: Organisation[] }) {
  }
}

export class UpsertOrganisations implements Action {
  readonly type = OrganisationActionTypes.UpsertOrganisations;

  constructor(public payload: { Organisations: Organisation[] }) {
  }
}

export class UpdateOrganisation implements Action {
  readonly type = OrganisationActionTypes.UpdateOrganisation;

  constructor(public payload: any) {
  }
}

export class UpdateOrganisationSuccess implements Action {
  readonly type = OrganisationActionTypes.UpdateOrganisationSuccess;

  constructor(public payload: any) {
  }
}

export class UpdateOrganisationFailure implements Action {
  readonly type = OrganisationActionTypes.UpdateOrganisationFailure;

  constructor(public payload: any) {
  }
}

export class SelectOrganisation implements Action {
  readonly type = OrganisationActionTypes.SelectOrganisation;

  constructor(public payload: string) {
  }
}
export class UpdateOrganisations implements Action {
  readonly type = OrganisationActionTypes.UpdateOrganisations;

  constructor(public payload: { Organisations: Update<Organisation>[] }) {
  }
}

export class DeleteOrganisation implements Action {
  readonly type = OrganisationActionTypes.DeleteOrganisation;

  constructor(public payload: { id: string }) {
  }
}


export class DeleteOrganisationSuccess implements Action {
  readonly type = OrganisationActionTypes.DeleteOrganisationSuccess;

  constructor(public payload: any) {
  }
}


export class DeleteOrganisationFailure implements Action {
  readonly type = OrganisationActionTypes.DeleteOrganisationFailure;

  constructor(public payload: any) {
  }
}

export class DeleteOrganisations implements Action {
  readonly type = OrganisationActionTypes.DeleteOrganisations;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearOrganisations implements Action {
  readonly type = OrganisationActionTypes.ClearOrganisations;
}

export class GetOrganisations implements Action {
  readonly type = OrganisationActionTypes.Get;
}

export class DoneLoagingOrganisations implements Action {
  readonly type = OrganisationActionTypes.DoneLoading;
}

export type OrganisationActions =
  LoadOrganisations
  | LoadOrganisationsSuccess
  | AddOrganisationFailure
  | AddOrganisation
  | AddOrganisationSuccess
  | UpsertOrganisation
  | AddOrganisations
  | SelectOrganisation
  | UpsertOrganisations
  | UpdateOrganisation
  | UpdateOrganisationSuccess
  | UpdateOrganisationFailure
  | UpdateOrganisations
  | DeleteOrganisation
  | DeleteOrganisationSuccess
  | DeleteOrganisationFailure
  | DeleteOrganisations
  | ClearOrganisations
  | GetOrganisations
  | DoneLoagingOrganisations;
