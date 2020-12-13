import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { LoadAgenciesFailure, LoadAgenciesSuccess, AgencyActionTypes, AgencyActions } from '../actions/agency.actions';




@Injectable()
export class AgencyEffects {

  @Effect()
  loadAgencies$ = this.actions$.pipe(
    ofType(AgencyActionTypes.LoadAgencies),
    concatMap(() =>
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      EMPTY.pipe(
        map(data => new LoadAgenciesSuccess({ Agencies: data })),
        catchError(error => of(new LoadAgenciesFailure({ error }))))
    )
  );



  constructor(private actions$: Actions<AgencyActions>) {}

}
