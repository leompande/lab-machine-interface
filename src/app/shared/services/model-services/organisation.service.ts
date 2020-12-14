import { Injectable } from '@angular/core';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';
import { Tables } from '../../tables.database';
import { DatastoreService } from '../dhis2/datastore.service';
import { Observable, forkJoin } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import { LoadOrganisations } from '../../../store/organisation/actions/organisation.actions';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  constructor(private dataStore: DatastoreService, private store: Store<ApplicationState>) { }
  datastorePath = 'organisations';
  getOrganisation(organisation: Organisation) {

  }

  listOrganisations(): Observable<any> {
    return Observable.create((observer: any) => {
      this.dataStore.getData(this.datastorePath, '').subscribe((results) => {
        forkJoin(results.map(organisationId => this.dataStore.getData(this.datastorePath, organisationId))).subscribe((results) => {
          observer.next(results);
          observer.complete();
        }, (error) => {
          observer.error(error);
          observer.complete();
        });
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  saveOrganisation(organisation: Organisation): Observable<any> {
    return Observable.create((observer: any) => {
      this.dataStore.saveData(this.datastorePath, organisation.id, organisation).subscribe((results) => {
        this.store.dispatch(new LoadOrganisations());
        observer.next(results);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  editOrganisation(organisation: Organisation) {
    return Observable.create((observer: any) => {
      this.dataStore.saveData(this.datastorePath, organisation.id, organisation).subscribe((results) => {
        this.store.dispatch(new LoadOrganisations());
        observer.next(results);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  deleteOrganisation(organisationId: string) {
    return Observable.create((observer: any) => {
      this.dataStore.deleteData(this.datastorePath, organisationId).subscribe((results) => {
        this.store.dispatch(new LoadOrganisations());
        observer.next(results);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  deleteRole(organisation: Organisation) {

  }
}
