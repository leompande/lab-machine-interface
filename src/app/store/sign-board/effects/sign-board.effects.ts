import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import { LoadSignBoardsFailure, LoadSignBoardsSuccess, SignBoardActionTypes, SignBoardActions, LoadSignBoards } from '../actions/sign-board.actions';
import { SignBoard } from '../reducers/sign-board';
import { SignBoardService } from 'src/app/shared/services/model-services/signboard.service';




@Injectable()
export class SignBoardEffects {

  @Effect()
  loadSignBoards$: Observable<any> = this.actions$.pipe(
    ofType(SignBoardActionTypes.LoadSignBoards),
    switchMap((action: LoadSignBoards) =>
      this.signBoardService.listSignBoards().pipe(
        map((signBoards: SignBoard[]) => new LoadSignBoardsSuccess({SignBoards:signBoards})),
        catchError((error: any) => of(new LoadSignBoardsFailure(error)))
      )
    )
  );




  constructor(private actions$: Actions<SignBoardActions>, private signBoardService: SignBoardService) {}

}
