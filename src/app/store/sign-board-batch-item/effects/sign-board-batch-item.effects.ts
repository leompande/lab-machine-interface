import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { LoadSignBoardBatchItemsFailure, LoadSignBoardBatchItemsSuccess, SignBoardBatchItemActionTypes, SignBoardBatchItemActions, LoadSignBoardBatchItems } from '../actions/sign-board-batch-item.actions';
import { SignBoardBatchItem } from '../reducers/sign-board-batch-item';
import { SignBoardBatchItemService } from 'src/app/shared/services/model-services/signboardbatchitem.service';

@Injectable()
export class SignBoardBatchItemEffects {

  @Effect()
  loadSignBoardBatchItems$: Observable<any> = this.actions$.pipe(
    ofType(SignBoardBatchItemActionTypes.LoadSignBoardBatchItems),
    switchMap((action: LoadSignBoardBatchItems) =>
      this.signBoardService.listSignBoardBatchItems().pipe(
        map((signBoards: SignBoardBatchItem[]) => new LoadSignBoardBatchItemsSuccess({ SignBoardBatchItems: signBoards })),
        catchError((error: any) => of(new LoadSignBoardBatchItemsFailure(error)))
      )
    )
  );

  constructor(private actions$: Actions<SignBoardBatchItemActions>, private signBoardService: SignBoardBatchItemService) { }

}
