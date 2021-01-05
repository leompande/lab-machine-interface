import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DatastoreService } from '../dhis2/datastore.service';
import { User } from 'src/app/store/user/reducers/user';
import { SignBoard } from 'src/app/store/sign-board/reducers/sign-board';
import { TrackerService } from '../dhis2/tracker.service';
import { ApplicationState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { LoadSignBoards, DeleteSignBoard } from 'src/app/store/sign-board/actions/sign-board.actions';
import { FirebaseDataService } from '../firebase/firebase-data.service';
@Injectable({
  providedIn: 'root'
})
export class SignBoardService {
  user: User;
  constructor(private dataStore: DatastoreService, private trackerService: TrackerService, private store: Store<ApplicationState>, private firebaseService: FirebaseDataService) {
    this.user = new Function('return ' + localStorage.getItem('sb-user'))();
  }

  getReference(): Observable<string> {
    const abbreviation = this.prepareAbbreviation(this.user.organisation);
    return Observable.create((observer) => {
      this.dataStore.getData('reference', abbreviation).subscribe(async (reference: any) => {
        reference = isNaN(reference) || reference == 999 || (new Date).getMonth() == 1 ? 1 : reference + 1;
        await this.dataStore.saveData('reference', abbreviation, +reference).toPromise();
        observer.next(abbreviation + this.prepareReferenceIndex(reference));
        observer.complete();
      }, (error) => {
        this.dataStore.saveData('reference', abbreviation, 1).subscribe((reference: any) => {
          observer.next(abbreviation + this.prepareReferenceIndex(1));
          observer.complete();
        }, (error) => {
          observer.error(error);
          observer.complete()
        });
      });
    });
  }

  listSignBoards(): Observable<any> {
    return Observable.create((observer: any) => {
      this.trackerService.getTrackedEntityInstance(
        'SignBoards', 'zs9X8YYBOnK',
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


  saveUpdateSignBoard(isUpdate, signBoard: SignBoard, trackedEntityInstanceId: string, eventDate: any): Observable<any> {

    return Observable.create((observer: any) => {

      this.dataStore.saveData('images', signBoard.id, { image: signBoard.signboard_image }).subscribe((imageResponse: any) => {
        signBoard.signboard_image = signBoard.id;
        let trackedEntityInstancePayload = this.trackerService.prepareTrackedEntityPayload('SignBoards', signBoard.organisation_unit_id, signBoard, !isUpdate ? 'add' :'edit', signBoard.trackedEntityInstance, eventDate);
        isUpdate?this.trackerService.updateTrackedEntityInstance([trackedEntityInstancePayload],signBoard.trackedEntityInstance).subscribe((results: any) => {
          this.store.dispatch(new LoadSignBoards());
          observer.next(results);
          observer.complete();
        }, error => {
          observer.error(error);
          observer.complete();
        }):
        this.trackerService.saveTrackedEntityInstances([trackedEntityInstancePayload]).subscribe((results: any) => {
          this.store.dispatch(new LoadSignBoards());
          observer.next(results);
          observer.complete();
        }, error => {
          observer.error(error);
          observer.complete();
        });
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  deleteSignBoard(id: string): Observable<any> {
    return Observable.create(observer => {
      this.trackerService.deleteTrackedEntityInstance(id).subscribe(results => {
        this.store.dispatch(new DeleteSignBoard({ id }));
        // this.store.dispatch(new LoadSignBoards());
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
