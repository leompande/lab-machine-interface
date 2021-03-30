import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatastoreService } from '../dhis2/datastore.service';
import { User } from 'src/app/store/user/reducers/user';
import { OutletAssignment } from 'src/app/store/outlet-assignment/reducers/outlet-assignment';
import { TrackerService } from '../dhis2/tracker.service';
import { ApplicationState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { LoadOutletAssignments, DeleteOutletAssignment } from 'src/app/store/outlet-assignment/actions/outlet-assignment.actions';
@Injectable({
  providedIn: 'root'
})
export class OutletAssignmentService {
  user: User;
  constructor(private dataStore: DatastoreService, private trackerService: TrackerService, private store: Store<ApplicationState>) {
    this.user = new Function('return ' + localStorage.getItem('sb-user'))();
  }

  listOutletAssignments(): Observable<any> {
    return Observable.create((observer: any) => {
      this.trackerService.getTrackedEntityInstance(
        "OutletAssignmentMetadata",
        "zs9X8YYBOnK", "DESCENDANTS").subscribe((response) => {
          observer.next(response);
          observer.complete();
        }, (error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  saveUpdateOutletAssignment(isUpdate, signBoardBatch?: OutletAssignment, trackedEntityInstanceId?: string, eventDate?: any): Observable<any> {
    return Observable.create((observer: any) => {
      let trackedEntityInstancePayload = this.trackerService.prepareTrackedEntityPayload('OutletAssignmentMetadata', signBoardBatch.organisation_unit_id, signBoardBatch, !isUpdate ? 'add' : 'edit', trackedEntityInstanceId, eventDate);
      let events = [];
      isUpdate ? this.trackerService.updateTrackedEntityInstance([trackedEntityInstancePayload], signBoardBatch.trackedEntityInstance).subscribe((results: any) => {
        this.store.dispatch(new LoadOutletAssignments());
        observer.next(results);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      }) :
        this.trackerService.saveTrackedEntityInstances([trackedEntityInstancePayload]).subscribe((results: any) => {
          observer.next(results);
            observer.complete();
        }, error => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  deleteOutletAssignment(trackedEntityInstance: string, id: string): Observable<any> {
    return Observable.create(observer => {
      this.trackerService.deleteTrackedEntityInstance(trackedEntityInstance).subscribe(results => {
        this.store.dispatch(new DeleteOutletAssignment({ id }));
        this.store.dispatch(new LoadOutletAssignments());
        observer.next(results);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  prepareAbbreviation(organisation: string) {
    const orgArrays = organisation.split(" ");
    return orgArrays[0].charAt(0) + (orgArrays.length > 1 ? orgArrays[1].charAt(0) : "").toLocaleUpperCase();
  }

  prepareReferenceIndex(referenceSequence: number) {
    let referenceIndex = '000';
    let minimalLength = 3;
    let date = new Date();
    let prefix = date.getFullYear() + '' + (date.getMonth() + 1);
    if (((referenceSequence + '').length) > 3) {
      referenceIndex = prefix + referenceSequence;
    } else {
      let remeainigZeroCount = minimalLength - ((referenceSequence + '').length);
      let mid = "";
      for (let i = 0; i <= remeainigZeroCount; i++) {
        mid += '0';
      }
      referenceIndex = prefix + mid + referenceSequence;
    }

    return referenceIndex;
  }
}
