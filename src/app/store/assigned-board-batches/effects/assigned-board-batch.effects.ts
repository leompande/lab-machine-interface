import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { LoadAssignedBoardBatchesFailure, LoadAssignedBoardBatchesSuccess, AssignedBoardBatchActionTypes, AssignedBoardBatchActions, LoadAssignedBoardBatches } from '../actions/assigned-board-batch.actions';
import { AssignedBoardBatch } from '../reducers/assigned-board-batch';
import { AssignedBoardBatchService } from 'src/app/shared/services/model-services/assignedboardbatch.service';
import { DoneLoadingAssignedBoardBatches } from '../../assigned-board-batches/actions/assigned-board-batch.actions';

@Injectable()
export class AssignedBoardBatchEffects {

  @Effect()
  loadAssignedBoardBatchs$: Observable<any> = this.actions$.pipe(
    ofType(AssignedBoardBatchActionTypes.LoadAssignedBoardBatches),
    switchMap((action: LoadAssignedBoardBatches) =>
      this.signBoardService.listAssignedBoardBatches().pipe(
        switchMap((assignedBoardBatches: AssignedBoardBatch[]) => [
          new LoadAssignedBoardBatchesSuccess({ AssignedBoardBatches: assignedBoardBatches }),
          new DoneLoadingAssignedBoardBatches()
        ]),
        catchError((error: any) => of(new LoadAssignedBoardBatchesFailure(error)))
      )
    )
  );

  constructor(private actions$: Actions<AssignedBoardBatchActions>, private signBoardService: AssignedBoardBatchService) { }

}
