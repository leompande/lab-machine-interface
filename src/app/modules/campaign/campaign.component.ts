import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCampaignComponent } from './add-edit/add-edit.component';
import { CampaignService } from 'src/app/shared/services/model-services/campaign.service';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { Campaign } from 'src/app/store/campaign/reducers/campaign';
import { fadeIn, fadeSmooth } from 'src/app/shared/animations/router-animation';
import { AddEditSignBoardComponent } from './add-edit-sign-board/add-edit-sign-board.component';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';
import { SignBoard } from 'src/app/store/sign-board/reducers/sign-board';
import { SignBoardService } from 'src/app/shared/services/model-services/signboard.service';
import { AddEditBoardBatchComponent } from './add-edit-board-batch/add-edit-board-batch.component';
import { SignBoardBatchService } from 'src/app/shared/services/model-services/signboardbatch.service';
import { SignBoardBatch } from 'src/app/store/sign-board-batch/reducers/sign-board-batch';
import { Outlet } from 'src/app/store/outlet/reducers/outlet';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
  animations: [fadeIn, fadeSmooth]
})
export class CampaignComponent implements OnInit {
  @Input() agencies: Agency[];
  @Input() agencyEntities: { [id: string]: Agency };
  @Input() campaigns: Campaign[];
  @Input() campaignEntities: { [id: string]: Campaign };
  @Input() userOrganisation: Organisation;
  @Input() signBoards: SignBoard[];
  @Input() outlets: Outlet[];
  @Input() outletEntities: { [id: string]: Outlet };
  @Input() signBoardBatches: SignBoardBatch[];
  @Input() signBoardBatchEntities: { [id: string]: SignBoardBatch };
  @Input() loadCampaign$: Observable<any>;
  allSignBoards: any[] = [];


  constructor(public dialog: MatDialog, private campaignService: CampaignService, private signBoardService: SignBoardService, private signBoardBatchService: SignBoardBatchService) {

  }

  ngOnInit(): void {
  }

  async createEditCampaign(currentObject?: any) {
    const reference = currentObject ? currentObject.reference : await this.campaignService.getReference().toPromise();
    const dialogRef = this.dialog.open(AddEditCampaignComponent, {
      data: {
        currentObject: currentObject,
        reference: reference,
        organisation: this.campaignService.user.organisation
      },
      width: '80%',
      maxHeight: '80%',
      disableClose: true,
      hasBackdrop: true,
      closeOnNavigation: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  editingCampaign(campaign: any) {
    this.createEditCampaign(campaign);
  }
  async deletingCampaign(campaign: Campaign) {
    await this.campaignService.deleteCampaign(campaign.trackedEntityInstance, campaign.id).toPromise();
  }

  createUpdateSignBoard(event: { campaign: Campaign, currentObject?: any }) {

    const dialogRef = this.dialog.open(AddEditSignBoardComponent, {
      data: {
        currentObject: event.currentObject,
        campaign: event.campaign,
        organisation: this.campaignService.user.organisation
      },
      width: '80%',
      maxHeight: '80%',
      disableClose: true,
      hasBackdrop: true,
      closeOnNavigation: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  updateSignBoard(eventObject: any) {
    this.createUpdateSignBoard(eventObject);
  }

  async deleteSignBoard(id: string) {
    await this.signBoardService.deleteSignBoard(id).toPromise();
  }

  async createUpdateSignBoardBatch(event: { campaign: Campaign, currentObject?: any }) {
    const reference = event.currentObject ? event.currentObject.reference : await this.signBoardBatchService.getReference(event.campaign.reference).toPromise();
    const dialogRef = this.dialog.open(AddEditBoardBatchComponent, {
      data: {
        currentObject: event.currentObject,
        campaign: event.campaign,
        organisation: this.campaignService.user.organisation,
        agencies: this.agencies,
        outlets: this.outlets,
        reference: reference
      },
      width: '80%',
      maxHeight: '80%',
      disableClose: true,
      hasBackdrop: true,
      closeOnNavigation: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  updateSignBoardBatch(eventObject: any) {
    this.createUpdateSignBoard(eventObject);
  }

  editSignBoardBatch({campaign,batch}){
     this.createUpdateSignBoardBatch({ campaign: campaign, currentObject: batch});
  }

  async deleteSignBoardBatch(id: string) {
    await this.signBoardService.deleteSignBoard(id).toPromise();
  }

}
