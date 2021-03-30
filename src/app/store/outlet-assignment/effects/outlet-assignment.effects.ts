import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { LoadOutletAssignmentsFailure, LoadOutletAssignmentsSuccess, OutletAssignmentActionTypes, OutletAssignmentActions, LoadOutletAssignments } from '../actions/outlet-assignment.actions';
import { OutletAssignment } from '../reducers/outlet-assignment';
import { OutletAssignmentService } from 'src/app/shared/services/model-services/outletassignment.service';
import { DoneLoadingOutletAssignments } from '../../outlet-assignment/actions/outlet-assignment.actions';

@Injectable()
export class OutletAssignmentEffects {

  @Effect()
  loadOutletAssignments$: Observable<any> = this.actions$.pipe(
    ofType(OutletAssignmentActionTypes.LoadOutletAssignments),
    switchMap((action: LoadOutletAssignments) =>
      this.signBoardService.listOutletAssignments().pipe(
        switchMap((assignedBoardBatches: OutletAssignment[]) => [
          new LoadOutletAssignmentsSuccess({ OutletAssignments: assignedBoardBatches }),
          new DoneLoadingOutletAssignments()
        ]),
        catchError((error: any) => of(new LoadOutletAssignmentsFailure(error)))
      )
    )
  );

  constructor(private actions$: Actions<OutletAssignmentActions>, private signBoardService: OutletAssignmentService) { }

}
