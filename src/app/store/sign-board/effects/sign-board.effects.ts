import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { LoadSignBoardsFailure, LoadSignBoardsSuccess, SignBoardActionTypes, SignBoardActions } from '../actions/sign-board.actions';




@Injectable()
export class SignBoardEffects {

  @Effect()
  loadSignBoards$ = this.actions$.pipe(
    ofType(SignBoardActionTypes.LoadSignBoards),
    concatMap(() =>
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      EMPTY.pipe(
        map(data => new LoadSignBoardsSuccess({ SignBoards: data })),
        catchError(error => of(new LoadSignBoardsFailure({ error }))))
    )
  );



  constructor(private actions$: Actions<SignBoardActions>) {}

}
