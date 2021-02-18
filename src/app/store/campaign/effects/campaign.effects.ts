import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import { LoadCampaignsFailure, LoadCampaignsSuccess, CampaignActionTypes, CampaignActions, LoadCampaigns, DoneLoagingCampaigns } from '../actions/campaign.actions';
import { CampaignService } from 'src/app/shared/services/model-services/campaign.service';
import { Campaign } from '../reducers/campaign';
import { LoadAgenciesFailure } from '../../agency/actions/agency.actions';
import { ApplicationState } from '../..';
import { Store } from '@ngrx/store';




@Injectable()
export class CampaignEffects {


  @Effect()
  loadCampaigns$: Observable<any> = this.actions$.pipe(
    ofType(CampaignActionTypes.LoadCampaigns),
    switchMap((action: LoadCampaigns) =>
      this.campaignService.listCampaigns().pipe(
        switchMap((campaigns: Campaign[]) => [new LoadCampaignsSuccess({ Campaigns: campaigns }), new DoneLoagingCampaigns()]),
        catchError((error: any) => of(new LoadCampaignsFailure(error)))
      )
    )
  );




  constructor(private actions$: Actions<CampaignActions>, private campaignService: CampaignService, private store: Store<ApplicationState>) { }

}
