import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DatastoreService } from '../dhis2/datastore.service';
import { User } from 'src/app/store/user/reducers/user';
import { TrackerService } from '../dhis2/tracker.service';
import { ApplicationState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { LoadCampaigns, DeleteCampaign } from 'src/app/store/campaign/actions/campaign.actions';
@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  user: User;
  constructor(private dataStore: DatastoreService, private trackerService: TrackerService, private store: Store<ApplicationState>) { 
    this.user = new Function('return '+localStorage.getItem('sb-user'))();
  }

  getReference(): Observable<string> {
    const abbreviation = this.prepareAbbreviation(this.user.organisation);
    return Observable.create((observer) => {
      this.dataStore.getData('reference', abbreviation).subscribe(async (reference: any) => {
        reference = isNaN(reference)||reference==999||(new Date).getMonth()==1?1:reference +1;
        await this.dataStore.saveData('reference', abbreviation, +reference).toPromise();
        observer.next(abbreviation+this.prepareReferenceIndex(reference));
        observer.complete();
      }, (error) => {
        this.dataStore.saveData('reference', abbreviation,1).subscribe((reference: any) => {
          observer.next(abbreviation+this.prepareReferenceIndex(1));
          observer.complete();
        }, (error) => {
          observer.error(error);
          observer.complete()
        });
      });
    });
  }

  listCampaigns(): Observable<any> {
    return Observable.create((observer: any) => {
      this.trackerService.getTrackedEntityInstance(
        'Campaigns','zs9X8YYBOnK',
        'SELECTED',
        ''
      ).subscribe((results)=>{
        observer.next(results);
        observer.complete();
      },(error)=>{
        observer.error(error);
        observer.complete();
      });
    });
  }

  
  saveUpdateCampaign(isUpdate,campaign: any,trackedEntityInstanceId: string,eventDate: any): Observable<any>{
    let trackedEntityInstance = this.trackerService.prepareTrackedEntityPayload('Campaigns','zs9X8YYBOnK',campaign,!isUpdate?'add':'edit',trackedEntityInstanceId,eventDate);
    return Observable.create(observer=>{
      this.trackerService.saveTrackedEntityInstances([trackedEntityInstance]).subscribe(results=>{
        this.store.dispatch(new LoadCampaigns());
        observer.next(results);
        observer.complete()
      },error=>{
        observer.error(error);
        observer.complete();
      });
    });
  }

  deleteCampaign(trackedEntityInstance: string, id: string): Observable<any> {
    return Observable.create(observer => {
      this.trackerService.deleteTrackedEntityInstance(trackedEntityInstance).subscribe(results => {
        this.store.dispatch(new DeleteCampaign({ id }));
        observer.next(results);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  prepareAbbreviation(organisation: string){
    const orgArrays = organisation.split(" ");
    return orgArrays[0].charAt(0)+(orgArrays.length>1?orgArrays[1].charAt(0):"").toLocaleUpperCase();
  }

  prepareReferenceIndex(referenceSequence: number){
    let referenceIndex = '000';
    let minimalLength = 3;
    let date = new Date();
    let prefix = date.getFullYear()+''+(date.getMonth()+1);
    if(((referenceSequence+'').length)>3){
      referenceIndex = prefix+referenceSequence;
    }else{
      let remeainigZeroCount = minimalLength-((referenceSequence+'').length);
      let mid = "";
      for (let i=0;i<=remeainigZeroCount;i++){
        mid+='0';
      }
      referenceIndex = prefix+mid+referenceSequence;
    }

    return referenceIndex;
  }
}