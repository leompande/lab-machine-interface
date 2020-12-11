import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { LoadUsersFailure, LoadUsersSuccess, UserActionTypes, UserActions } from '../actions/user.actions';




@Injectable()
export class UserEffects {

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUsers),
    concatMap(() =>
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      EMPTY.pipe(
        map(data => new LoadUsersSuccess({ Users: data })),
        catchError(error => of(new LoadUsersFailure({ error }))))
    )
  );



  constructor(private actions$: Actions<UserActions>) {}

}
