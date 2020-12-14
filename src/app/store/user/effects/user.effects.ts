import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import { LoadUsersFailure, LoadUsersSuccess, UserActionTypes, UserActions, LoadUsers } from '../actions/user.actions';
import { User } from '../reducers/user';
import { UserService } from 'src/app/shared/services/model-services/user.service';




@Injectable()
export class UserEffects {

  @Effect()
  loadUsers$: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.LoadUsers),
    switchMap((action: LoadUsers) =>
      this.userService.listUsers().pipe(
        map((users: User[]) => new LoadUsersSuccess({Users:users})),
        catchError((error: any) => of(new LoadUsersFailure(error)))
      )
    )
  );



  constructor(private actions$: Actions<UserActions>, private userService: UserService) {}

}
