import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DatastoreService } from '../dhis2/datastore.service';
import { User } from 'src/app/store/user/reducers/user';
import { SignBoardBatch } from 'src/app/store/sign-board-batch/reducers/sign-board-batch';
import { TrackerService } from '../dhis2/tracker.service';
import { ApplicationState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { LoadSignBoardBatches, DeleteSignBoardBatch } from 'src/app/store/sign-board-batch/actions/sign-board-batch.actions';
import { FirebaseDataService } from '../firebase/firebase-data.service';
import { prepareSignBoardData, makeId } from '../../helpers';
@Injectable({
  providedIn: 'root'
})
export class SignBoardBatchService {
  user: User;
  constructor(private dataStore: DatastoreService, private trackerService: TrackerService, private store: Store<ApplicationState>, private firebaseService: FirebaseDataService) {
    this.user = new Function('return ' + localStorage.getItem('sb-user'))();
  }

  getReference(campaignReference): Observable<string> {
    const abbreviation = this.prepareAbbreviation(this.user.organisation);
    return Observable.create((observer) => {
      this.dataStore.getData('batch-reference', abbreviation).subscribe(async (reference: any) => {
        reference = isNaN(reference) || reference == 999 || (new Date).getMonth() == 1 ? 1 : reference + 1;
        await this.dataStore.saveData('batch-reference', abbreviation, +reference).toPromise();
        observer.next(campaignReference + "/" + this.prepareReferenceIndex(reference));
        observer.complete();
      }, (error) => {
        this.dataStore.saveData('batch-reference', abbreviation, 1).subscribe((reference: any) => {
          observer.next(campaignReference + "/" + this.prepareReferenceIndex(1));
          observer.complete();
        }, (error) => {
          observer.error(error);
          observer.complete()
        });
      });
    });
  }

  listSignBoardBatches(): Observable<any> {
    return Observable.create((observer: any) => {
      this.trackerService.getTrackedEntityInstance(
        'SignBoardBatches', 'zs9X8YYBOnK',
        'DESCENDANTS',
        ''
      ).subscribe((results) => {
        observer.next(results);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }


  saveUpdateSignBoardBatch(isUpdate, signBoardBatch: SignBoardBatch | any, trackedEntityInstanceId: string, eventDate: any): Observable<any> {
    console.log(isUpdate, signBoardBatch.batch_reference_number, trackedEntityInstanceId, eventDate);
    return Observable.create((observer: any) => {
      let events = [];
      // event.outlet + "."+event.agency + "."+event.boardHeight + "." + event.boardWidth + "." + event.boardQuantity + ((index == events.length - 1) ? "" : "_")

      let substring = signBoardBatch.batch_reference_number.substring(0, signBoardBatch.batch_reference_number.length - 1);
      let last_number = signBoardBatch.batch_reference_number.substring(signBoardBatch.batch_reference_number.length - 1);
      console.log(substring);
      console.log(last_number);
      let counter = +last_number;
      let last_reference = "";
      let signBoardBatches = signBoardBatch.boards_config.split("_").map(config => {
        console.log(signBoardBatch);
        const parameter = config.split(".");
        const outlet = +parameter[0];
        const agency_name = +parameter[1];
        const height = +parameter[2];
        const weight = +parameter[3];
        const count = +parameter[4];
        let new_batch_reference = substring + "" + counter;
        const batch = {
          ...signBoardBatch,
          batch_reference_number: new_batch_reference,
          board_height: height,
          board_width: weight,
          agency_name: agency_name,
          outlet: outlet,
          signboard_quantity: count,
          trackedEntityInstanceId: makeId()
        };
        for (let eventCount = 0; eventCount < count; eventCount++) {
          events = [...events, this.trackerService.prepareSingleEvent(
            'SignBoardBatches',
            signBoardBatch.organisation_unit_id,
            "SignBoards",
            prepareSignBoardData((eventCount + 1), batch),
            null
          )];
        }
        last_reference = new_batch_reference
        counter++;
        batch.signboard_quantity = events.length;
        return batch;
      });
      let boardsNumber = 0;
      signBoardBatches.forEach(async (signBoardbatchItem: SignBoardBatch) => {
        boardsNumber++;
        let trackedEntityInstancePayload = this.trackerService.prepareTrackedEntityPayload('SignBoardBatches', signBoardbatchItem.organisation_unit_id, signBoardbatchItem, !isUpdate ? 'add' : 'edit', signBoardbatchItem.trackedEntityInstance, eventDate);
        if (isUpdate) {
          this.trackerService.updateTrackedEntityInstance([trackedEntityInstancePayload], signBoardbatchItem.trackedEntityInstance).subscribe(async (results: any) => {

            const abbreviation = this.prepareAbbreviation(this.user.organisation);
            try {
              await this.dataStore.saveData('batch-reference', abbreviation, +last_reference.split("/")[1]).toPromise();
            } catch (e) {
            }
            if (boardsNumber == signBoardBatches.length) {
              this.store.dispatch(new LoadSignBoardBatches());
            }
            observer.next(results);
            observer.complete();
          }, error => {
            observer.error(error);
            observer.complete();
          });
        } else {
          this.trackerService.saveTrackedEntityInstances([trackedEntityInstancePayload]).subscribe((results: any) => {
            if (boardsNumber == signBoardBatches.length) {
              this.store.dispatch(new LoadSignBoardBatches());
            }

            observer.next(results);
            observer.complete();
          }, error => {
            observer.error(error);
            observer.complete();
          });
        }
      });

    });
  }

  deleteSignBoardBatch(trackedEntityInstance: string, id: string): Observable<any> {
    return Observable.create(observer => {
      this.trackerService.deleteTrackedEntityInstance(trackedEntityInstance).subscribe(results => {
        this.store.dispatch(new DeleteSignBoardBatch({ id }));
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
