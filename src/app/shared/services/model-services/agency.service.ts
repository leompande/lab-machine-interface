import { Injectable } from '@angular/core';
import { DatastoreService } from '../dhis2/datastore.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { Observable, forkJoin } from 'rxjs';
import { LoadAgencies } from 'src/app/store/agency/actions/agency.actions';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  constructor(private dataStore: DatastoreService, private store: Store<ApplicationState>) { }
  datastorePath = 'agencies';
  getAgency(organisation: Agency) {

  }

  listAgencies(organisationId?:string): Observable<any> {
    return Observable.create((observer: any) => {
      this.dataStore.getData(this.datastorePath, organisationId?organisationId:'').subscribe((results) => {
        if (organisationId){
          observer.next(...results);
          observer.complete();
        } else{
          forkJoin(results.map(organisationId => this.dataStore.getData(this.datastorePath, organisationId))).subscribe((results) => {
            observer.next([].concat.apply([],results));
            observer.complete();
          }, (error) => {
            observer.error(error);
            observer.complete();
          });
        }
        
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  saveAgency(agency: Agency, agencies: Agency[]): Observable<any> {
    let updatedAgencies = (agencies||[]).filter(agent=>agent.organisationId==agency.organisationId && agent.id !=agency.id);
    if (updatedAgencies.length>0){
      updatedAgencies = [
        ...updatedAgencies,
        agency
      ]
    }else{
      updatedAgencies = [agency];
    }
    return Observable.create((observer: any) => {
      this.dataStore.saveData(this.datastorePath, agency.organisationId, updatedAgencies).subscribe((results) => {
        this.store.dispatch(new LoadAgencies());
        observer.next(results);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  editAgency(organisation: Agency) {
    return Observable.create((observer: any) => {
      this.dataStore.saveData(this.datastorePath, organisation.id, organisation).subscribe((results) => {
        this.store.dispatch(new LoadAgencies());
        observer.next(results);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  deleteAgency(agency: Agency, agencies: Agency[]) {
    return Observable.create((observer: any) => {
      this.dataStore.saveData(this.datastorePath, agency.organisationId, agencies.filter(agent=>agent.id!==agency.id)).subscribe((results) => {
        this.store.dispatch(new LoadAgencies());
        observer.next(results);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }
}
