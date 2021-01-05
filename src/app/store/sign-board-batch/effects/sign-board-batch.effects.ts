import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { LoadSignBoardBatchesFailure, LoadSignBoardBatchesSuccess, SignBoardBatchActionTypes, SignBoardBatchActions, LoadSignBoardBatches } from '../actions/sign-board-batch.actions';
import { SignBoardBatch } from '../reducers/sign-board-batch';
import { SignBoardBatchService } from 'src/app/shared/services/model-services/signboardbatch.service';

@Injectable()
export class SignBoardBatchEffects {

  @Effect()
  loadSignBoardBatches$: Observable<any> = this.actions$.pipe(
    ofType(SignBoardBatchActionTypes.LoadSignBoardBatches),
    switchMap((action: LoadSignBoardBatches) =>
      this.signBoardService.listSignBoardBatches().pipe(
        map((signBoards: SignBoardBatch[]) => new LoadSignBoardBatchesSuccess({ SignBoardBatches: signBoards })),
        catchError((error: any) => of(new LoadSignBoardBatchesFailure(error)))
      )
    )
  );

  constructor(private actions$: Actions<SignBoardBatchActions>, private signBoardService: SignBoardBatchService) { }

}
