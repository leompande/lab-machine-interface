import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { LoadOutletsFailure, LoadOutletsSuccess, OutletActionTypes, OutletActions, LoadOutlets, DoneLoadingOutlets } from '../actions/outlet.actions';
import { OutletService } from 'src/app/shared/services/model-services/outlet.service';
import { Outlet } from '../reducers/outlet';




@Injectable()
export class OutletEffects {


  @Effect()
  loadOutlets$: Observable<any> = this.actions$.pipe(
    ofType(OutletActionTypes.LoadOutlets),
    switchMap((action: LoadOutlets) =>
      this.outletService.listOutlets().pipe(
        switchMap((outlets: Outlet[]) => [new LoadOutletsSuccess({ Outlets: outlets }), new DoneLoadingOutlets()]),
        catchError((error: any) => of(new LoadOutletsFailure(error)))
      )
    )
  );




  constructor(private actions$: Actions<OutletActions>, private outletService: OutletService) { }

}
