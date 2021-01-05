import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatastoreService } from '../dhis2/datastore.service';
import { User } from 'src/app/store/user/reducers/user';
import { SignBoardBatchItem } from 'src/app/store/sign-board-batch-item/reducers/sign-board-batch-item';
import { TrackerService } from '../dhis2/tracker.service';
import { ApplicationState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { LoadSignBoardBatchItems, DeleteSignBoardBatchItem } from 'src/app/store/sign-board-batch-item/actions/sign-board-batch-item.actions';
import { FirebaseDataService } from '../firebase/firebase-data.service';
import { prepareSignBoardData } from '../../helpers';
@Injectable({
  providedIn: 'root'
})
export class SignBoardBatchItemService {
  user: User;
  constructor(private dataStore: DatastoreService, private trackerService: TrackerService, private store: Store<ApplicationState>, private firebaseService: FirebaseDataService) {
    this.user = new Function('return ' + localStorage.getItem('sb-user'))();
  }


  listSignBoardBatchItems(ou: string): Observable<any> {
    return Observable.create((observer: any) => {
      this.trackerService.getEvents(
        "SignBoardBatches",
        ou,
        "SignBoards"
      ).subscribe((results) => {
        observer.next(this.trackerService.transformEventData("SignBoardBatches","SignBoards",results));
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }


  saveUpdateSignBoardBatchItem(isUpdate, signBoardBatch: SignBoardBatchItem, trackedEntityInstanceId: string, eventDate: any): Observable<any> {

    return Observable.create((observer: any) => {
      let trackedEntityInstancePayload = this.trackerService.prepareTrackedEntityPayload('SignBoardBatchItems', signBoardBatch.organisation_unit_id, signBoardBatch, !isUpdate ? 'add' : 'edit', trackedEntityInstanceId, eventDate);
      let events = [];
      isUpdate ? this.trackerService.updateTrackedEntityInstance([trackedEntityInstancePayload], signBoardBatch.trackedEntityInstance).subscribe((results: any) => {
        this.store.dispatch(new LoadSignBoardBatchItems());
        observer.next(results);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      }) :
        this.trackerService.saveTrackedEntityInstances([trackedEntityInstancePayload]).subscribe((results: any) => {
          for (let eventCount = 0; eventCount < (+signBoardBatch.signboard_quantity); eventCount++) {
            events = [...events, this.trackerService.prepareEvents('SignBoardBatchItems',
              signBoardBatch.organisation_unit_id,
              trackedEntityInstanceId,
              "SignBoards",
              trackedEntityInstancePayload['enrollments'][0],
              prepareSignBoardData((eventCount + 1), signBoardBatch),
              null,
              null)];
          }
          this.trackerService.saveEvents(events).subscribe((eventResults) => {
            this.store.dispatch(new LoadSignBoardBatchItems());
            observer.next(eventResults);
            observer.complete();
          }, eventsError => {
            observer.error(eventsError);
            observer.complete();
          });
        }, error => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  deleteSignBoardBatchItem(trackedEntityInstance: string, id: string): Observable<any> {
    return Observable.create(observer => {
      this.trackerService.deleteTrackedEntityInstance(trackedEntityInstance).subscribe(results => {
        this.store.dispatch(new DeleteSignBoardBatchItem({ id }));
        this.store.dispatch(new LoadSignBoardBatchItems());
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
