import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { LoadOrganisationsFailure, LoadOrganisationsSuccess, OrganisationActionTypes, OrganisationActions } from '../actions/organisation.actions';




@Injectable()
export class OrganisationEffects {

  @Effect()
  loadOrganisations$ = this.actions$.pipe(
    ofType(OrganisationActionTypes.LoadOrganisations),
    concatMap(() =>
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      EMPTY.pipe(
        map(data => new LoadOrganisationsSuccess({ Organisations: data })),
        catchError(error => of(new LoadOrganisationsFailure({ error }))))
    )
  );



  constructor(private actions$: Actions<OrganisationActions>) {}

}
