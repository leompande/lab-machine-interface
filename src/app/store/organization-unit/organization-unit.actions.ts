import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { OrganizationUnit } from './organization-unit.model';
import { OrganizationUnitLevel } from './organization-unit-level.model';

export enum OrganizationUnitActionTypes {
  GetOrganizationUnits = '[OrganisatinUnit] Get OrganisatinUnits',
  DoneLoadingOrganizationUnits = '[OrganisatinUnit] Done Loading OrganisatinUnits',
  SetSelectedOrganisatinUnit = '[OrganisatinUnit] Set Selected OrganisatinUnits',
  GetOrganisatinUnitLevels = '[OrganisatinUnit] Get OrganisatinUnit Levels',
  LoadOrganisatinUnits = '[OrganisatinUnit] Load OrganisatinUnits',
  AddOrganisatinUnit = '[OrganisatinUnit] Add OrganisatinUnit',
  UpsertOrganisatinUnit = '[OrganisatinUnit] Upsert OrganisatinUnit',
  AddOrganisatinUnits = '[OrganisatinUnit] Add OrganisatinUnits',
  UpsertOrganisatinUnits = '[OrganisatinUnit] Upsert OrganisatinUnits',
  UpdateOrganisatinUnit = '[OrganisatinUnit] Update OrganisatinUnit',
  UpdateOrganisatinUnits = '[OrganisatinUnit] Update OrganisatinUnits',
  DeleteOrganisatinUnit = '[OrganisatinUnit] Delete OrganisatinUnit',
  DeleteOrganisatinUnits = '[OrganisatinUnit] Delete OrganisatinUnits',
  ClearOrganisatinUnits = '[OrganisatinUnit] Clear OrganisatinUnits'
}

export class LoadOrganisatinUnits implements Action {
  readonly type = OrganizationUnitActionTypes.LoadOrganisatinUnits;

  constructor(public payload: { organisatinUnits: OrganizationUnit[] }) {}
}

export class AddOrganisatinUnit implements Action {
  readonly type = OrganizationUnitActionTypes.AddOrganisatinUnit;

  constructor(public payload: { organisatinUnit: OrganizationUnit }) {}
}

export class UpsertOrganisatinUnit implements Action {
  readonly type = OrganizationUnitActionTypes.UpsertOrganisatinUnit;

  constructor(public payload: { organisatinUnit: OrganizationUnit }) {}
}

export class AddOrganisatinUnits implements Action {
  readonly type = OrganizationUnitActionTypes.AddOrganisatinUnits;

  constructor(public payload: { organisatinUnits: OrganizationUnit[] }) {}
}

export class UpsertOrganisatinUnits implements Action {
  readonly type = OrganizationUnitActionTypes.UpsertOrganisatinUnits;

  constructor(public payload: { organisatinUnits: OrganizationUnit[] }) {}
}

export class UpdateOrganisatinUnit implements Action {
  readonly type = OrganizationUnitActionTypes.UpdateOrganisatinUnit;

  constructor(public payload: { organisatinUnit: Update<OrganizationUnit> }) {}
}

export class UpdateOrganisatinUnits implements Action {
  readonly type = OrganizationUnitActionTypes.UpdateOrganisatinUnits;

  constructor(
    public payload: { organisatinUnits: Update<OrganizationUnit>[] }
  ) {}
}

export class DeleteOrganisatinUnit implements Action {
  readonly type = OrganizationUnitActionTypes.DeleteOrganisatinUnit;

  constructor(public payload: { id: string }) {}
}

export class DeleteOrganisatinUnits implements Action {
  readonly type = OrganizationUnitActionTypes.DeleteOrganisatinUnits;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearOrganisatinUnits implements Action {
  readonly type = OrganizationUnitActionTypes.ClearOrganisatinUnits;
}

export class GetOrganisatinUnitLevels implements Action {
  readonly type = OrganizationUnitActionTypes.GetOrganisatinUnitLevels;
  constructor(
    public payload: { organisationUnitLevels: OrganizationUnitLevel[] }
  ) {}
}

export class GetOrganisatinUnits implements Action {
  readonly type = OrganizationUnitActionTypes.GetOrganizationUnits;
}

export class DoneLoadingOrganisatinUnits implements Action {
  readonly type = OrganizationUnitActionTypes.DoneLoadingOrganizationUnits;
}

export class SetSelectedOrganisatinUnit implements Action {
  readonly type = OrganizationUnitActionTypes.SetSelectedOrganisatinUnit;
  constructor(public payload: string) {}
}

export type OrganisatinUnitActions =
  | LoadOrganisatinUnits
  | AddOrganisatinUnit
  | UpsertOrganisatinUnit
  | AddOrganisatinUnits
  | UpsertOrganisatinUnits
  | UpdateOrganisatinUnit
  | UpdateOrganisatinUnits
  | DeleteOrganisatinUnit
  | DeleteOrganisatinUnits
  | ClearOrganisatinUnits
  | GetOrganisatinUnits
  | GetOrganisatinUnitLevels
  | DoneLoadingOrganisatinUnits
  | GetOrganisatinUnits
  | SetSelectedOrganisatinUnit;
