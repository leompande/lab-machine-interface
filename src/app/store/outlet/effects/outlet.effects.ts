import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import { LoadOutletsFailure, LoadOutletsSuccess, OutletActionTypes, OutletActions, LoadOutlets } from '../actions/outlet.actions';
import { OutletService } from 'src/app/shared/services/model-services/outlet.service';
import { Outlet } from '../reducers/outlet';
import { LoadAgenciesFailure } from '../../agency/actions/agency.actions';




@Injectable()
export class OutletEffects {


  @Effect()
  loadOutlets$: Observable<any> = this.actions$.pipe(
    ofType(OutletActionTypes.LoadOutlets),
    switchMap((action: LoadOutlets) =>
      this.outletService.listOutlets().pipe(
        map((outlets: Outlet[]) => new LoadOutletsSuccess({Outlets:outlets})),
        catchError((error: any) => of(new LoadOutletsFailure(error)))
      )
    )
  );




  constructor(private actions$: Actions<OutletActions>, private outletService: OutletService) {}

}
