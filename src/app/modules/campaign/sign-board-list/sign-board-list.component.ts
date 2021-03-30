import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Campaign } from 'src/app/store/campaign/reducers/campaign';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';
import { SignBoard } from 'src/app/store/sign-board/reducers/sign-board';
import { SignboardMoreComponent } from '../signboard-more/signboard-more.component';
import { MatDialog } from '@angular/material/dialog';
import { DatastoreService } from 'src/app/shared/services/dhis2/datastore.service';
import { fadeIn } from 'src/app/shared/animations/router-animation';

@Component({
  selector: 'app-sign-board-list',
  templateUrl: './sign-board-list.component.html',
  styleUrls: ['./sign-board-list.component.scss'],
  animations: [fadeIn]
})
export class SignBoardListComponent implements OnInit, OnChanges {
  @Input() campaigns;
  @Input() signBoards;
  @Input() userOrganisation: Organisation;
  @Input() signBoardBatches;
  searchKey: string;
  searchHeaders: { name: string }[] = [
    { name: 'district_council_name' },
    { name: 'board_height' },
    { name: 'board_width' },
    { name: 'street_name' },
    { name: 'date_to_be_planted' },
  ];
  showable: any = {};

  tableConfigurations = {
    tableColumns: [
      { name: 'district_council_name', label: 'District Council' },
      { name: 'board_height', label: 'Board Height' },
      { name: 'board_width', label: 'Board Width' },
      { name: 'street_name', label: 'Street name' },
      { name: 'date_to_be_planted', label: 'Date to plant' },
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
    empty_msg: 'No Sign Biards'
  };
  @Input() loading: boolean;
  @Output() creatEditSignBoard = new EventEmitter;
  @Output() creatEditSignBoardBatch = new EventEmitter;
  @Output() deletingSignBoard = new EventEmitter;
  @Output() editSignBoard = new EventEmitter;

  @Output() deletingCampaign = new EventEmitter;
  @Output() editingCampaign = new EventEmitter;
  @Input() loadReference: boolean;

  campaingActions = {};
  creatingBatchAction = {};

  constructor(public dialog: MatDialog, private storeService: DatastoreService) {

  }

  ngOnInit(): void {
    console.log(this.loadReference);
  }


  ngOnChanges(): void {
    if (this.loadReference == false){
      this.creatingBatchAction = {};
    }
    this.searchHeaders = this.campaigns && this.campaigns.length > 0 ? Object.keys(this.campaigns[0]).map(key => { return { name: key } }) : [];
  }

  showDropDown(id: string, event) {
    event.stopPropagation();
    if (!this.campaingActions[id]) {
      this.campaingActions = {};
    }
    this.campaingActions[id] = this.campaingActions[id] ? !this.campaingActions[id] : true;
  }

  searchCampaign(event) {
    this.searchKey = event.target.value;
  }

  createUpdateSignBoard(campaign: Campaign, currentObject?: any) {
    this.loading = true;
    this.creatEditSignBoard.emit({ campaign, currentObject });
  }

  filterSignBoards(signBoards: SignBoard[], campaign: Campaign) {
    return [];
  }

  editCampaign(campaign: Campaign, event: any) {
    event.stopPropagation();
    this.showDetails(campaign);
    this.editingCampaign.emit(campaign);

  }

  deleteCampaign(campaign: Campaign, signBoards: SignBoard[], event: any) {
    event.stopPropagation();
    this.showDetails(campaign);
    if (signBoards && signBoards.filter((board: SignBoard) => board.campaign_reference_number == campaign.reference).length > 0) {
    } else {
      this.deletingCampaign.emit(campaign);
    }
  }

  updateSignBoardBatch(campaign: Campaign, batchId: any) {
    this.creatingBatchAction = {};
    this.creatingBatchAction[campaign.id] = true;
    this.creatEditSignBoardBatch.emit({ campaign, batch: this.signBoardBatches.find((batch: any) => batch.id == batchId) });
  }


  previewSignBoardBatch(campaign, $event) {

  }
  deleteSignBoardBatch($event) {

  }

  updateSignBoard(campaign: Campaign, event: string) {
    this.editSignBoard.emit({ campaign, currentObject: this.signBoards.find(signBoard => signBoard.id === event) });
  }

  deleteSignBoard(event) {
    this.deletingSignBoard.emit(event);
  }

  async previewSignBoard(campaign: Campaign, event) {
    const signBoard: SignBoard = this.signBoards.find((signBoard: any) => signBoard.id == event);
    const imageData: any = await this.storeService.getData('images', signBoard.id).toPromise();
    const dialogRef = this.dialog.open(SignboardMoreComponent, {
      width: '95%',
      maxHeight: '80%',
      disableClose: true,
      hasBackdrop: true, data: {
        signBoard: this.signBoards.find((signBoard: any) => signBoard.id == event),
        campaign: campaign,
        signBoardImage: imageData ? imageData.image : ''
      },
      closeOnNavigation: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  showDetails(campaign) {
    this.campaingActions = {};
    this.showable[campaign.id] = this.showable[campaign.id] ? !this.showable[campaign.id] : true;
  }

}
