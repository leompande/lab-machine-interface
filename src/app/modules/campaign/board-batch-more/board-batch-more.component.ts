import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignBoardBatchItem } from 'src/app/store/sign-board-batch-item/reducers/sign-board-batch-item';
import { SignBoardBatch } from 'src/app/store/sign-board-batch/reducers/sign-board-batch';

@Component({
  selector: 'app-board-batch-more',
  templateUrl: './board-batch-more.component.html',
  styleUrls: ['./board-batch-more.component.scss']
})
export class BoardBatchMoreComponent implements OnInit {
  boardItems: SignBoardBatchItem[];
  batch: SignBoardBatch;
  tableConfigurations = {
    tableColumns: [
      { name: 'bar_code', label: 'Bar Code', type:'barcode'},
      { name: 'board_height', label: 'Board Height' },
      { name: 'board_width', label: 'Board Width' },
      { name: 'date_to_be_planted', label: 'Expected planting date' },
      { name: 'actual_planting_date', label:'Actual Planting Date'},
      { name: 'sign_board_status',label:'Status'},
      { name: 'street_name', label:'Street Name'},
      { name: 'outlet', label:'Outlet'},
      { name: 'longitude', label:'Longitude'},
      { name: 'latitude', label:'Latitude'}
     
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: { boardItems: SignBoardBatchItem[], batch: SignBoardBatch }) {
  this.boardItems = data.boardItems;  
  this.batch = data.batch;
  }

  ngOnInit(): void {
  }

  cancel() {
    document.getElementById("closeButton")?.click();
  }

}
