import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { LoadApplicationsFailure, LoadApplicationsSuccess, ApplicationActionTypes, ApplicationActions } from '../actions/application.actions';




@Injectable()
export class ApplicationEffects {

  @Effect()
  loadApplications$ = this.actions$.pipe(
    ofType(ApplicationActionTypes.LoadApplications),
    concatMap(() =>
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      EMPTY.pipe(
        map(data => new LoadApplicationsSuccess({ Applications:data })),
        catchError(error => of(new LoadApplicationsFailure({ error }))))
    )
  );



  constructor(private actions$: Actions<ApplicationActions>) {}

}
