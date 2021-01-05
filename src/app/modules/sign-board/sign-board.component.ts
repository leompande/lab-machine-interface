import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SignBoard } from 'src/app/store/sign-board/reducers/sign-board';
import { MatDialog } from '@angular/material/dialog';
import { SignBoardMoreComponent } from './sign-board-more/sign-board-more.component';

@Component({
  selector: 'app-sign-board',
  templateUrl: './sign-board.component.html',
  styleUrls: ['./sign-board.component.scss']
})
export class SignBoardComponent implements OnInit {

  @Input() signBoards: SignBoard[];
  @Input() signBoardEntities: { [id: string]: SignBoard };
  loading$!: Observable<boolean>;

  allTableConfigurations = {
    tableColumns: [
      { name: 'campaign_name', label: 'Campaign' },
      { name: 'district_council_name', label: 'District Council' },
      { name: 'board_height', label: 'Board Height' },
      { name: 'board_width', label: 'Board Width' },
      { name: 'street_name', label: 'Street Name' },
      { name: 'date_to_be_planted', label: 'Date Expected To Plant' },
    ],
    tableCaption: ' ',
    tableNotifications: '',
    showBorder: true,
    allowPagination: true,
    actionIcons: { edit: true, delete: false, more: true },
    doneLoading: false,
    showSearch: true,
    deleting: {},
    empty_msg: 'No Sign Boards'
  };

  plantedTableConfigurations = {
    tableColumns: [
      { name: 'campaign_name', label: 'Campaign' },
      { name: 'district_council_name', label: 'District Council' },
      { name: 'board_height', label: 'Board Height' },
      { name: 'board_width', label: 'Board Width' },
      { name: 'street_name', label: 'Street Name' },
      { name: 'date_to_be_planted', label: 'Date Expected To Plant' },
      { name: 'actual_planting_date', label: 'Actual Planting Date' },
      { name: 'signboard_image', label: 'Photo' },
    ],
    tableCaption: ' ',
    tableNotifications: '',
    showBorder: true,
    allowPagination: true,
    actionIcons: { edit: true, delete: false, more: true },
    doneLoading: false,
    showSearch: true,
    deleting: {},
    empty_msg: 'No Sign Boards'
  };

  verifiedTableConfigurations = {
    tableColumns: [
      { name: 'campaign_name', label: 'Campaign' },
      { name: 'district_council_name', label: 'District Council' },
      { name: 'board_height', label: 'Board Height' },
      { name: 'board_width', label: 'Board Width' },
      { name: 'street_name', label: 'Street Name' },
      { name: 'date_to_be_planted', label: 'Date Expected To Plant' },
      { name: 'actual_planting_date', label: 'Actual Planting Date' },
      { name: 'verification_date', label: 'Verification Date' },
      { name: 'signboard_image', label: 'Photo' },
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
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  editNewlyAssigned(signBoardId: string) {
    this.signBoards.find(signBoardData => {
      return signBoardData.id == signBoardId;
    });
    const dialogRef = this.dialog.open(SignBoardMoreComponent, {
      data: {
        currentObject: this.signBoards.find(signBoardData => signBoardData.id == signBoardId),
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

}