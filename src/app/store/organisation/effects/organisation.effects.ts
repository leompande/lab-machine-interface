import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import { LoadOrganisationsFailure, LoadOrganisationsSuccess, OrganisationActionTypes, OrganisationActions, LoadOrganisations } from '../actions/organisation.actions';
import { OrganisationService } from 'src/app/shared/services/model-services/organisation.service';
import { Organisation } from '../reducers/organisation';
import { LoadAgenciesFailure } from '../../agency/actions/agency.actions';




@Injectable()
export class OrganisationEffects {


  @Effect()
  loadOrganisations$: Observable<any> = this.actions$.pipe(
    ofType(OrganisationActionTypes.LoadOrganisations),
    switchMap((action: LoadOrganisations) =>
      this.organisationService.listOrganisations().pipe(
        map((organisations: Organisation[]) => new LoadOrganisationsSuccess({Organisations:organisations})),
        catchError((error: any) => of(new LoadAgenciesFailure(error)))
      )
    )
  );




  constructor(private actions$: Actions<OrganisationActions>, private organisationService: OrganisationService) {}

}
