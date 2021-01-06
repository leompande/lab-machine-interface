import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { SignBoardBatchItemService } from '../../../shared/services/model-services/signboardbatchitem.service';
import { SignBoardBatch } from '../../../store/sign-board-batch/reducers/sign-board-batch';
import { SignBoardBatchService } from '../../../shared/services/model-services/signboardbatch.service';
import { MatDialog } from '@angular/material/dialog';
import { BoardBatchMoreComponent } from '../board-batch-more/board-batch-more.component';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../store';
import { Outlet } from '../../../store/outlet/reducers/outlet';
import * as fromOuletSelector from '../../../store/outlet/selectors/outlet.selectors';
import { SignBoardBatchItem } from 'src/app/store/sign-board-batch-item/reducers/sign-board-batch-item';

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
      { name: 'district_council_name', label: 'District Council' },
      // { name: 'board_height', label: 'Board Height' },
      // { name: 'board_width', label: 'Board Width' },
      { name: 'signboard_quantity', label: 'Asigned Quantity' },
      { name: 'planted_signboard_quantity', label: 'Planted Quantity' },
      { name: 'agency_name', label: 'Agency' },
      { name: 'start_date', label: 'Start Date' },
      { name: 'end_date', label: 'End Date' }
    ],
    tableCaption: ' ',
    tableNotifications: '',
    printTitle: '',
    showBorder: true,
    allowPagination: true,
    actionIcons: { edit: true, delete: true, more: true },
    doneLoading: false,
    showSearch: true,
    deleting: {},
    empty_msg: 'No Sign Boards'
  };
  loading$!: Observable<boolean>;
  outlets: Outlet[];
  constructor(public dialog: MatDialog, private signBoardBatch: SignBoardBatchService, private signBoardBatchItem: SignBoardBatchItemService, private store: Store<ApplicationState>) {
    this.store.select(fromOuletSelector.selectAll).subscribe((outlets) => {
      this.outlets = outlets;
    });
  }

  ngOnInit(): void {
  }

  rowPreview(rowId: string) {

    const batch: SignBoardBatch = this.tableList.find((item: any) => item.id == rowId);
    console.log(batch);
    this.signBoardBatchItem.listSignBoardBatchItems(batch.organisation_unit_id).subscribe((boardItems) => {
      const dialogRef = this.dialog.open(BoardBatchMoreComponent, {
        width: '95%',
        maxHeight: '700px',
        disableClose: true,
        hasBackdrop: true, data: {
          boardItems: boardItems.filter((boardItem: SignBoardBatchItem)=>boardItem.batch_reference_number == batch.batch_reference_number),
          batch: batch,
          outlets: this.outlets
        },
        closeOnNavigation: true
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }, (error) => {
    });
  }

  async rowDelete(rowId: string) {
    const batch: SignBoardBatch = this.tableList.find((item: any) => item.id == rowId);
    const response = await this.signBoardBatch.deleteSignBoardBatch(batch.trackedEntityInstance, rowId).toPromise();
    console.log(response);
  }

  async rowUpdating(rowId: string) {
    this.rowUpdate.emit(rowId);
    // const batch: SignBoardBatch = this.tableList.find((item: any) => item.id == rowId);
    // const response  = await this.signBoardBatch.deleteSignBoardBatch(batch.trackedEntityInstance, rowId).toPromise();
    // console.log(response);
  }

}
