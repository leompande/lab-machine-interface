import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AssignedBoardBatchService } from 'src/app/shared/services/model-services/assignedboardbatch.service';
import { AddEditBatchAssignmentComponent } from './add-edit/add-edit.component';
import { AssignedBoardBatch } from 'src/app/store/assigned-board-batches/reducers/assigned-board-batch';

@Component({
  selector: 'app-batch-assignment',
  templateUrl: './batch-assignment.component.html',
  styleUrls: ['./batch-assignment.component.scss']
})
export class BatchAssignmentComponent implements OnInit {

  @Input()
  assignedBoardBatches!: AssignedBoardBatch[];
  @Input() assignedBoardBatchEntities: any;
  @Input() loading$!: Observable<boolean>;

  tableConfigurations = {
    tableColumns: [
      { name: 'name', label: 'Outlet Name' },
      { name: 'street', label: 'Street' },
      { name: 'ward', label: 'Ward' },
      { name: 'district', label: 'District' },
      { name: 'region', label: 'Region' },
      { name: 'ownership', label: 'Ownership' },
      { name: 'latitude', label: 'Latitude' },
      { name: 'longitude', label: 'Longitude' },
      { name: 'ownerName', label: 'Owner' },
      { name: 'phone', label: 'Phone' },
      { name: 'email', label: 'Email' },
      { name: 'box', label: 'P.O. Box' }

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

  constructor(public dialog: MatDialog, private assignedBoardBatchService: AssignedBoardBatchService) { }

  ngOnInit(): void {
  }


  deleteOutlet(){}

  printArrival(){}

  updateOutlet(boardBatchId: string) {
    const dialogRef = this.dialog.open(AddEditBatchAssignmentComponent, {
      data: {
        currentObject: this.assignedBoardBatches.find(boardBatch => boardBatch.id == boardBatchId),
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
      width: '95%',
      maxHeight: '80%',
      disableClose: true,
      hasBackdrop: true, data: {},
      closeOnNavigation: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
