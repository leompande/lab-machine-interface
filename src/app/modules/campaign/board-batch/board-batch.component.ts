import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SignBoardBatchItemService } from 'src/app/shared/services/model-services/signboardbatchitem.service';
import { SignBoardBatch } from 'src/app/store/sign-board-batch/reducers/sign-board-batch';
import { SignBoardBatchService } from 'src/app/shared/services/model-services/signboardbatch.service';
import { MatDialog } from '@angular/material/dialog';
import { BoardBatchMoreComponent } from '../board-batch-more/board-batch-more.component';

@Component({
  selector: 'app-board-batch',
  templateUrl: './board-batch.component.html',
  styleUrls: ['./board-batch.component.scss']
})
export class BoardBatchComponent implements OnInit {
  @Input() tableList;
  tableConfigurations = {
    tableColumns: [
      { name: 'batch_reference_number', label: 'Batch No.' },
      { name: 'district_council_name', label: 'District Council' },
      { name: 'board_height', label: 'Board Height' },
      { name: 'board_width', label: 'Board Width' },
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
  constructor(public dialog: MatDialog,private signBoardBatch: SignBoardBatchService,private signBoardBatchItem: SignBoardBatchItemService) { }

  ngOnInit(): void {
  }

  rowPreview(rowId: string) {
    const batch: SignBoardBatch = this.tableList.find((item: any) => item.id == rowId);
    this.signBoardBatchItem.listSignBoardBatchItems(batch.organisation_unit_id).subscribe((boardItems) => {
      const dialogRef = this.dialog.open(BoardBatchMoreComponent, {
        width: '95%',
        maxHeight: '700px',
        disableClose: true,
        hasBackdrop: true, data: {
          boardItems: boardItems,
          batch: batch
        },
        closeOnNavigation: true
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }, (error) => {
    });
  }

  async rowDelete(rowId: string){
    const batch: SignBoardBatch = this.tableList.find((item: any) => item.id == rowId);
    const response  = await this.signBoardBatch.deleteSignBoardBatch(batch.trackedEntityInstance, rowId).toPromise();
    console.log(response);
  }

}
