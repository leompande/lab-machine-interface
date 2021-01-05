import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {OrganizationUnitActionTypes} from './organization-unit.actions';
import { tap} from 'rxjs/operators';
import {ConfigurationService} from '../../services/configuration.service';


@Injectable()
export class OrganizationUnitEffects {

  constructor(
    private actions$: Actions,
    private dataService: ConfigurationService) {}

  @Effect({dispatch: false})
  loadOrganizationUnits: Observable<any> = this.actions$.pipe(
    ofType(OrganizationUnitActionTypes.GetOrganizationUnits),
    tap(() => {
      this.dataService.getOrganisationUnits();
    })
  );

  @Effect({dispatch: false})
  loadOrganizationUnitLevels: Observable<any> = this.actions$.pipe(
    ofType(OrganizationUnitActionTypes.GetOrganisatinUnitLevels),
    tap(() => {
      this.dataService.getOrganisationUnitlevels();
    })
  );
}
