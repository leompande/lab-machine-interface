import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { LoadUserRolesFailure, LoadUserRolesSuccess, UserRoleActionTypes, UserRoleActions } from '../actions/user-role.actions';




@Injectable()
export class UserRoleEffects {

  @Effect()
  loadUserRoles$ = this.actions$.pipe(
    ofType(UserRoleActionTypes.LoadUserRoles),
    concatMap(() =>
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      EMPTY.pipe(
        map(data => new LoadUserRolesSuccess({ UserRoles: data })),
        catchError(error => of(new LoadUserRolesFailure({ error }))))
    )
  );



  constructor(private actions$: Actions<UserRoleActions>) {}

}
