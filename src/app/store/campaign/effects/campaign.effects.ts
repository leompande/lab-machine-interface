import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import { LoadCampaignsFailure, LoadCampaignsSuccess, CampaignActionTypes, CampaignActions, LoadCampaigns } from '../actions/campaign.actions';
import { CampaignService } from 'src/app/shared/services/model-services/campaign.service';
import { Campaign } from '../reducers/campaign';
import { LoadAgenciesFailure } from '../../agency/actions/agency.actions';




@Injectable()
export class CampaignEffects {


  @Effect()
  loadCampaigns$: Observable<any> = this.actions$.pipe(
    ofType(CampaignActionTypes.LoadCampaigns),
    switchMap((action: LoadCampaigns) =>
      this.campaignService.listCampaigns().pipe(
        map((campaigns: Campaign[]) => new LoadCampaignsSuccess({Campaigns:campaigns})),
        catchError((error: any) => of(new LoadAgenciesFailure(error)))
      )
    )
  );




  constructor(private actions$: Actions<CampaignActions>, private campaignService: CampaignService) {}

}
