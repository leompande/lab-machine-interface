import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import { LoadAgenciesFailure, LoadAgenciesSuccess, AgencyActionTypes, AgencyActions, LoadAgencies, DoneLoadingAgencies } from '../actions/agency.actions';
import { Agency } from '../reducers/agency';




@Injectable()
export class AgencyEffects {






  constructor(private actions$: Actions<AgencyActions>) {}

}
