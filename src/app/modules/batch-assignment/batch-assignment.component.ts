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
import { PreviewAssignmentComponent } from './preview-assignment/preview-assignment.component';
import { OutletAssignment } from 'src/app/store/outlet-assignment/reducers/outlet-assignment';

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
  @Input() outletsAssignments: OutletAssignment[];
  assignedBoardBatchesMappedList: AssignedBoardBatch[] = [];

  tableConfigurations = {
    tableColumns: [
      { name: 'campaign_name', label: 'Campaign' },
      { name: 'batch_reference_number', label: 'Batch Reference' },
      { name: 'board_height', label: 'Board Height', type: 'NUMBER' },
      { name: 'board_width', label: 'Board Width', type: 'NUMBER' },
      { name: 'signboard_quantity', label: 'Assigned Quantity', type: 'NUMBER' },
      { name: 'planted_quantity', label: 'Planted Quantity', type: 'NUMBER' },
      { name: 'agency_name', label: 'Assigned Agency' },
      { name: 'start_date', label: 'Start Planting Date' },
      { name: 'end_date', label: 'End Planting Date' },
      { name: 'actual_planting_date', label: 'Actual finshing planting date' }
    ],
    tableCaption: ' ',
    tableNotifications: '',
    showBorder: true,
    allowPagination: true,
    actionIcons: { edit: true, delete: true, more: true },
    doneLoading: false,
    showSearch: true,
    showMap: true,
    deleting: {},
    empty_msg: 'No Assignments'
  };


  constructor(public dialog: MatDialog, private assignedBoardBatchService: AssignedBoardBatchService, private store: Store<ApplicationState>) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    if (this.assignedBoardBatches.length > 0) {
      this.assignedBoardBatchesMappedList = this.assignedBoardBatches.map((signboard) => {
        return {
          ...signboard,
          campaign_name: this.campaings.find(campaign => campaign.reference === signboard.campaign_reference_number).campaign_name
        };
      });
    }

  }


  async deleteOutlet(boardBatchId: string) {
    const assignedBatch: AssignedBoardBatch = this.assignedBoardBatches.find((batch) => batch.id == boardBatchId);
    const response = await this.assignedBoardBatchService.deleteAssignedBoardBatch(assignedBatch.trackedEntityInstance, assignedBatch.id).toPromise();
    this.store.dispatch(new LoadAssignedBoardBatches());
  }

  printPreview(data: any) {
    const dialogRef = this.dialog.open(PreviewAssignmentComponent, {
      data: {
        currentObject: this.assignedBoardBatches.find(boardBatch => boardBatch.id == data),
        campaigns: this.campaings,
        batches: this.batches,
        outlets: this.outlets,
        outletsAssignments: this.outletsAssignments,
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
