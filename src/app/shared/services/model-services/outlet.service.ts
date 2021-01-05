import { Injectable } from '@angular/core';
import { Outlet } from 'src/app/store/outlet/reducers/outlet';
import { Tables } from '../../tables.database';
import { DatastoreService } from '../dhis2/datastore.service';
import { Observable, forkJoin } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import { LoadOutlets } from '../../../store/outlet/actions/outlet.actions';

@Injectable({
  providedIn: 'root'
})
export class OutletService {
  constructor(private dataStore: DatastoreService, private store: Store<ApplicationState>) { }
  datastorePath = 'outlets';
  getOutlet(outlet: Outlet) {

  }

  listOutlets(): Observable<any> {
    return Observable.create((observer: any) => {
      this.dataStore.getData(this.datastorePath, '').subscribe((results) => {
        forkJoin(results.map(outletId => this.dataStore.getData(this.datastorePath, outletId))).subscribe((results) => {
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

  saveOutlet(outlet: Outlet): Observable<any> {
    return Observable.create((observer: any) => {
      this.dataStore.saveData(this.datastorePath, outlet.id, outlet).subscribe((results) => {
        this.store.dispatch(new LoadOutlets());
        observer.next(results);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  editOutlet(outlet: Outlet) {
    return Observable.create((observer: any) => {
      this.dataStore.saveData(this.datastorePath, outlet.id, outlet).subscribe((results) => {
        this.store.dispatch(new LoadOutlets());
        observer.next(results);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  deleteOutlet(outletId: string) {
    return Observable.create((observer: any) => {
      this.dataStore.deleteData(this.datastorePath, outletId).subscribe((results) => {
        this.store.dispatch(new LoadOutlets());
        observer.next(results);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  deleteRole(outlet: Outlet) {

  }
}
