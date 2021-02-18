import { Action } from '@ngrx/store';
import { Campaign } from '../reducers/campaign';
import { Update } from '@ngrx/entity';

export enum CampaignActionTypes {
  Get = '[Campaign] Get Campaigns',
  DoneLoading = '[Campaign] Done Loading Campaigns',
  LoadCampaigns = '[Campaign] Load Campaigns',
  LoadCampaignsSuccess = '[Campaign] Load Campaigns Success',
  SelectCampaign = '[Campaign] Select Campaign',
  LoadCampaignsFailure = '[Campaign] Load Campaigns Failure',
  AddCampaign = '[Campaign] Add Campaign',
  AddCampaignSuccess = '[Campaign] Add Campaign Success',
  AddCampaignFailure = '[Campaign] Add Campaign Failure',
  UpsertCampaign = '[Campaign] Upsert Campaign',
  AddCampaigns = '[Campaign] Add Campaigns',
  UpsertCampaigns = '[Campaign] Upsert Campaigns',
  UpdateCampaign = '[Campaign] Update Campaign',
  UpdateCampaignSuccess = '[Campaign] Update Campaign Success',
  UpdateCampaignFailure = '[Campaign] Update Campaign Failure',
  UpdateCampaigns = '[Campaign] Update Campaigns',
  DeleteCampaign = '[Campaign] Delete Campaign',
  DeleteCampaignSuccess = '[Campaign] Delete Campaign Success',
  DeleteCampaignFailure = '[Campaign] Delete Campaign Failure',
  DeleteCampaigns = '[Campaign] Delete Campaigns',
  ClearCampaigns = '[Campaign] Clear Campaigns'
}

export class LoadCampaigns implements Action {
  readonly type = CampaignActionTypes.LoadCampaigns;
}

export class LoadCampaignsSuccess implements Action {
  readonly type = CampaignActionTypes.LoadCampaignsSuccess;
  constructor(public payload: { Campaigns: Campaign[] }) { }
}

export class LoadCampaignsFailure implements Action {
  readonly type = CampaignActionTypes.LoadCampaignsFailure;
  constructor(public payload: { error: any }) { }
}


export class AddCampaign implements Action {
  readonly type = CampaignActionTypes.AddCampaign;

  constructor(public payload: { Campaign: Campaign }) {
  }
}

export class AddCampaignSuccess implements Action {
  readonly type = CampaignActionTypes.AddCampaignSuccess;

  constructor(public payload: any) {
  }
}
export class AddCampaignFailure implements Action {
  readonly type = CampaignActionTypes.AddCampaignFailure;

  constructor(public payload: any) {
  }
}

export class UpsertCampaign implements Action {
  readonly type = CampaignActionTypes.UpsertCampaign;

  constructor(public payload: { Campaign: Campaign }) {
  }
}

export class AddCampaigns implements Action {
  readonly type = CampaignActionTypes.AddCampaigns;

  constructor(public payload: { Campaigns: Campaign[] }) {
  }
}

export class UpsertCampaigns implements Action {
  readonly type = CampaignActionTypes.UpsertCampaigns;

  constructor(public payload: { Campaigns: Campaign[] }) {
  }
}

export class UpdateCampaign implements Action {
  readonly type = CampaignActionTypes.UpdateCampaign;

  constructor(public payload: any) {
  }
}

export class UpdateCampaignSuccess implements Action {
  readonly type = CampaignActionTypes.UpdateCampaignSuccess;

  constructor(public payload: any) {
  }
}

export class UpdateCampaignFailure implements Action {
  readonly type = CampaignActionTypes.UpdateCampaignFailure;

  constructor(public payload: any) {
  }
}

export class SelectCampaign implements Action {
  readonly type = CampaignActionTypes.SelectCampaign;

  constructor(public payload: string) {
  }
}
export class UpdateCampaigns implements Action {
  readonly type = CampaignActionTypes.UpdateCampaigns;

  constructor(public payload: { Campaigns: Update<Campaign>[] }) {
  }
}

export class DeleteCampaign implements Action {
  readonly type = CampaignActionTypes.DeleteCampaign;

  constructor(public payload: { id: string }) {
  }
}


export class DeleteCampaignSuccess implements Action {
  readonly type = CampaignActionTypes.DeleteCampaignSuccess;

  constructor(public payload: any) {
  }
}


export class DeleteCampaignFailure implements Action {
  readonly type = CampaignActionTypes.DeleteCampaignFailure;

  constructor(public payload: any) {
  }
}

export class DeleteCampaigns implements Action {
  readonly type = CampaignActionTypes.DeleteCampaigns;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearCampaigns implements Action {
  readonly type = CampaignActionTypes.ClearCampaigns;
}

export class GetCampaigns implements Action {
  readonly type = CampaignActionTypes.Get;
}

export class DoneLoagingCampaigns implements Action {
  readonly type = CampaignActionTypes.DoneLoading;
}

export type CampaignActions =
  LoadCampaigns
  | LoadCampaignsSuccess
  | LoadCampaignsFailure
  | AddCampaignFailure
  | AddCampaign
  | AddCampaignSuccess
  | UpsertCampaign
  | AddCampaigns
  | SelectCampaign
  | UpsertCampaigns
  | UpdateCampaign
  | UpdateCampaignSuccess
  | UpdateCampaignFailure
  | UpdateCampaigns
  | DeleteCampaign
  | DeleteCampaignSuccess
  | DeleteCampaignFailure
  | DeleteCampaigns
  | ClearCampaigns
  | GetCampaigns
  | DoneLoagingCampaigns;
