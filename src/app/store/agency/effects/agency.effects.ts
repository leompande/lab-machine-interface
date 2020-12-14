import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import { LoadAgenciesFailure, LoadAgenciesSuccess, AgencyActionTypes, AgencyActions, LoadAgencies } from '../actions/agency.actions';
import { Agency } from '../reducers/agency';
import { AgencyService } from 'src/app/shared/services/model-services/agency.service';




@Injectable()
export class AgencyEffects {

  @Effect()
  loadAgencies$: Observable<any> = this.actions$.pipe(
    ofType(AgencyActionTypes.LoadAgencies),
    switchMap((action: LoadAgencies) =>
      this.agencyService.listAgencies().pipe(
        map((agencies: Agency[]) => new LoadAgenciesSuccess({Agencies:agencies})),
        catchError((error: any) => of(new LoadAgenciesFailure(error)))
      )
    )
  );




  constructor(private actions$: Actions<AgencyActions>,private agencyService: AgencyService) {}

}
