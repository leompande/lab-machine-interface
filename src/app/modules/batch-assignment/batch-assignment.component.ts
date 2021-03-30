import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AssignedBoardBatchService } from 'src/app/shared/services/model-services/assignedboardbatch.service';
import { AddEditBatchAssignmentComponent } from './add-edit/add-edit.component';
import { AssignedBoardBatch } from 'src/app/store/assigned-board-batches/reducers/assigned-board-batch';
import { Campaign } from 'src/app/store/campaign/reducers/campaign';
import { SignBoardBatch } from 'src/app/store/sign-board-batch/reducers/sign-board-batch';
import { Outlet } from 'src/app/store/outlet/reducers/outlet';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { ApplicationState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { LoadAssignedBoardBatches } from 'src/app/store/assigned-board-batches/actions/assigned-board-batch.actions';

@Component({
  selector: 'app-batch-assignment',
  templateUrl: './batch-assignment.component.html',
  styleUrls: ['./batch-assignment.component.scss']
})
export class BatchAssignmentComponent implements OnInit, OnChanges {

  @Input()
  assignedBoardBatches!: AssignedBoardBatch[];
  @Input() assignedBoardBatchEntities: any;
  @Input() loading$!: Observable<boolean>;
  @Input() campaings: Campaign[];
  @Input() batches: SignBoardBatch[];
  @Input() outlets: Outlet[];
  @Input() agencies: Agency[];

  tableConfigurations = {
    tableColumns: [
      { name: 'campaign_reference_number', label: 'Campaign Reference' },
      { name: 'batch_reference_number', label: 'Batch Reference' },
      { name: 'board_height', label: 'Board Height' },
      { name: 'board_width', label: 'Board Width' },
      { name: 'signboard_quantity', label: 'Assigned Quantity' },
      { name: 'planted_quantity', label: 'Planted Quantity' },
      { name: 'agency_name', label: 'Assigned Agency' },
      { name: 'start_date', label: 'Start Planting Date' },
      { name: 'end_date', label: 'End Planting Date' },
      { name: 'actual_planting_date', label: 'Actual finshing planting date' },
      // { name: 'status', label: 'Status' }

    ],
    tableCaption: ' ',
    tableNotifications: '',
    showBorder: true,
    allowPagination: true,
    actionIcons: { edit: true, delete: true, more: false },
    doneLoading: false,
    showSearch: true,
    showMap: true,
    deleting: {},
    empty_msg: 'No Assignments'
  };

  // mappedBatchValues: any[] = [];

  constructor(public dialog: MatDialog, private assignedBoardBatchService: AssignedBoardBatchService, private store: Store<ApplicationState>) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes:any): void {
    // if (changes.campaings && changes.campaings.firstChange == false && changes.campaings.currentValue.length>0){
    //   console.log(changes.campaings.currentValue);
    //   this.mappedBatchValues = this.assignedBoardBatches.map(batch=>{
    //     console.log(batch);
    //     return {
    //       ...batch,
    //       campaign: this.campaings.find(campaing=>campaing.reference==batch.campaign_reference_number).campaign_name
    //     }
    //   });
    //   console.log(this.mappedBatchValues);
    // }

  }


  async deleteOutlet(boardBatchId: string) {
    const assignedBatch: AssignedBoardBatch = this.assignedBoardBatches.find((batch) => batch.id == boardBatchId);
    const response = await this.assignedBoardBatchService.deleteAssignedBoardBatch(assignedBatch.trackedEntityInstance, assignedBatch.id).toPromise();
    this.store.dispatch(new LoadAssignedBoardBatches());
  }

  printArrival() { }

  updateOutlet(boardBatchId: string) {
    const dialogRef = this.dialog.open(AddEditBatchAssignmentComponent, {
      data: {
        currentObject: null,//this.assignedBoardBatches.find(boardBatch => boardBatch.id == boardBatchId),
        campaigns: this.campaings,
        batches: this.batches,
        outlets: this.outlets,
        agencies: this.agencies
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



  openDialog() {
    const dialogRef = this.dialog.open(AddEditBatchAssignmentComponent, {
      data: {
        campaigns: this.campaings,
        batches: this.batches,
        outlets: this.outlets,
        agencies: this.agencies
      },
      width: '95%',
      maxHeight: '80%',
      disableClose: true,
      hasBackdrop: true,
      closeOnNavigation: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
