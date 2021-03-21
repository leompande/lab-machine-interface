import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SignBoardBatch } from 'src/app/store/sign-board-batch/reducers/sign-board-batch';
import { Outlet } from 'src/app/store/outlet/reducers/outlet';
import { BoardBatchMoreComponent } from '../campaign/board-batch-more/board-batch-more.component';
import { SignBoardBatchItem } from 'src/app/store/sign-board-batch-item/reducers/sign-board-batch-item';
import { SignBoardBatchItemService } from 'src/app/shared/services/model-services/signboardbatchitem.service';
import { AgencyBatchMoreComponent } from './agency-batch-more/agency-batch-more.component';

@Component({
  selector: 'app-sign-board-batch',
  templateUrl: './sign-board-batch.component.html',
  styleUrls: ['./sign-board-batch.component.scss']
})
export class SignBoardBatchComponent implements OnInit {

  @Input() signBoardBatches: SignBoardBatch[];
  @Input() signBoardBatchEntities: { [id: string]: SignBoardBatch };
  @Input() outlets: Outlet[];
  @Input() loading: boolean;
  allTableConfigurations = {
    tableColumns: [
      { name: 'batch_reference_number', label: 'Batch Ref#' },
      { name: 'campaign_name', label: 'Campaign' },
      { name: 'signboard_quantity', label: 'Assign sign boards' },
      { name: 'region', label: 'Region' },
      { name: 'district_council_name', label: 'District Council' },
      { name: 'outlet', label: 'Outlet' },
      { name: 'agency_name', label: 'Agency' },
      { name: 'start_date', label: 'Date expected to plant from' },
      { name: 'end_date', label: 'Date expected to plant to' },
    ],
    tableCaption: ' ',
    tableNotifications: '',
    showBorder: true,
    allowPagination: true,
    actionIcons: { edit: false, delete: false, more: true },
    doneLoading: false,
    showSearch: true,
    deleting: {},
    empty_msg: 'No Sign Boards'
  };

  constructor(public dialog: MatDialog, private sigBoardBatchItemService: SignBoardBatchItemService) { }

  ngOnInit(): void {
  }

  rowPreview(rowId: string) {
    const batch: SignBoardBatch = this.signBoardBatches.find((item: any) => item.id == rowId);
    this.loading = true;
    this.sigBoardBatchItemService.listSignBoardBatchItems(batch.organisation_unit_id).subscribe((boardItems) => {
      this.loading = false;
      const dialogRef = this.dialog.open(AgencyBatchMoreComponent, {
        width: '95%',
        maxHeight: '700px',
        disableClose: true,
        hasBackdrop: true, data: {
          boardItems: boardItems.filter((boardItem: SignBoardBatchItem) => boardItem.batch_reference_number == batch.batch_reference_number),
          batch: batch,
          outlets: this.outlets
        },
        closeOnNavigation: true
      });
      dialogRef.afterClosed().subscribe((result: any) => {
      });
    }, (error: any) => {
    });
  }

  // async rowDelete(rowId: string) {
  //   const batch: SignBoardBatch = this.tableList.find((item: any) => item.id == rowId);
  //   const response = await this.signBoardBatch.deleteSignBoardBatch(batch.trackedEntityInstance, rowId).toPromise();
  //   console.log(response);
  // }



  editNewlyAssigned(signBoardId: string) {
    // this.signBoardBatches.find(signBoardData => {
    //   return signBoardData.id == signBoardId;
    // });
    // const dialogRef = this.dialog.open(SignBoardBatchMoreComponent, {
    //   data: {
    //     currentObject: this.signBoardBatches.find(signBoardData => signBoardData.id == signBoardId),
    //   },
    //   width: '80%',
    //   maxHeight: '80%',
    //   disableClose: true,
    //   hasBackdrop: true,
    //   closeOnNavigation: true
    // });
    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

}
