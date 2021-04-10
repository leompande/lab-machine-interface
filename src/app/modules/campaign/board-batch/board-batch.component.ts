import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { SignBoardBatch } from '../../../store/sign-board-batch/reducers/sign-board-batch';
import { SignBoardBatchService } from '../../../shared/services/model-services/signboardbatch.service';
import { MatDialog } from '@angular/material/dialog';
import { BoardBatchMoreComponent } from '../board-batch-more/board-batch-more.component';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../store';
import { Outlet } from '../../../store/outlet/reducers/outlet';
import * as fromOuletSelector from '../../../store/outlet/selectors/outlet.selectors';

@Component({
  selector: 'app-board-batch',
  templateUrl: './board-batch.component.html',
  styleUrls: ['./board-batch.component.scss']
})
export class BoardBatchComponent implements OnInit {
  @Input() tableList;
  @Output() rowUpdate: any = new EventEmitter();
  tableConfigurations = {
    tableColumns: [
      { name: 'batch_reference_number', label: 'Batch No.' },
      { name: 'start_date', label: 'Start Date' },
      { name: 'end_date', label: 'End Date' },
      // { name: 'region', label: 'Region' },
      // { name: 'district_council_name', label: 'District Council' },
      // { name: 'outlet', label: 'Outlet' },
      { name: 'board_height', label: 'Board Height', type:'NUMBER' },
      { name: 'board_width', label: 'Board Width', type:'NUMBER' },
      { name: 'signboard_quantity', label: 'Quantity', type:'NUMBER' },
      { name: 'asigned_quantity', label: 'Assigned to Date' },
      // { name: 'agency_name', label: 'Agency' },
      { name: 'planted_quantity', label: 'Planted Quantity', type:'NUMBER' },
      { name: 'status', label: 'Status' } // Not Started , In progress, Completed
    ],
    tableCaption: ' ',
    tableNotifications: '',
    printTitle: '',
    showBorder: true,
    allowPagination: true,
    actionIcons: { edit: true, delete: true },
    doneLoading: false,
    showSearch: true,
    deleting: {},
    empty_msg: 'No Sign Boards'
  };
  @Input() loading: boolean;
  outlets: Outlet[];
  constructor(public dialog: MatDialog, private signBoardBatch: SignBoardBatchService, private store: Store<ApplicationState>) {
    this.store.select(fromOuletSelector.selectAll).subscribe((outlets) => {
      this.outlets = outlets;
    });
  }

  ngOnInit(): void {
  }

  rowPreview(rowId: string) {
    // const batch: SignBoardBatch = this.tableList.find((item: any) => item.id == rowId);
    // this.signBoardBatchItem.listSignBoardBatchItems(batch.organisation_unit_id).subscribe((boardItems) => {
    //   const dialogRef = this.dialog.open(BoardBatchMoreComponent, {
    //     width: '95%',
    //     maxHeight: '700px',
    //     disableClose: true,
    //     hasBackdrop: true, data: {
    //       boardItems: [],//boardItems.filter((boardItem: SignBoardBatchItem) => boardItem.batch_reference_number == batch.batch_reference_number),
    //       batch: batch,
    //       outlets: this.outlets
    //     },
    //     closeOnNavigation: true
    //   });
    //   dialogRef.afterClosed().subscribe((result: any) => {
    //   });
    // }, (error: any) => {
    // });
  }

  async rowDelete(rowId: string) {
    this.loading = true;
    const batch: SignBoardBatch = this.tableList.find((item: any) => item.id == rowId);
    const response = await this.signBoardBatch.deleteSignBoardBatch(batch.trackedEntityInstance, rowId).toPromise();
    this.loading = false;
  }

  async rowUpdating(rowId: string) {
    this.rowUpdate.emit(rowId);
    // const batch: SignBoardBatch = this.tableList.find((item: any) => item.id == rowId);
    // const response  = await this.signBoardBatch.deleteSignBoardBatch(batch.trackedEntityInstance, rowId).toPromise();
    // console.log(response);
  }

}
