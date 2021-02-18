import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { Observable } from 'rxjs';
import * as fromAgencySelector from '../../../store/agency/selectors/agency.selectors';
import * as fromOultetSelector from '../../../store/outlet/selectors/outlet.selectors';
import * as fromCampaignSelector from '../../../store/campaign/selectors/campaign.selectors';
import { Campaign } from '../../../store/campaign/reducers/campaign';
import { Organisation } from '../../../store/organisation/reducers/organisation';
import * as fromOrganisationSelector from '../../../store/organisation/selectors/organisation.selectors';
import { SignBoard } from 'src/app/store/sign-board/reducers/sign-board';
import * as fromSignBoardSelector from '../../../store/sign-board/selectors/sign-board.selectors';
import * as fromSignBoardBatchSelector from '../../../store/sign-board-batch/selectors/sign-board-batch.selectors';
import { SignBoardBatch } from 'src/app/store/sign-board-batch/reducers/sign-board-batch';
import { Outlet } from 'src/app/store/outlet/reducers/outlet';

@Component({
  selector: 'app-campaign-container',
  templateUrl: './campaign-container.component.html',
  styleUrls: ['./campaign-container.component.scss']
})
export class CampaignContainerComponent implements OnInit {

  agencies$: Observable<Agency[]>;
  agencyEntities$: Observable<{ [id: string]: Agency }>;

  outlets$: Observable<Outlet[]>;
  outletEntities$: Observable<{ [id: string]: Outlet }>;

  campaigns$: Observable<Campaign[]>;
  campaignEntities$: Observable<{ [id: string]: Campaign }>;
  userOrganisation$: Observable<Organisation>;
  signBoards$: Observable<SignBoard[]>;
  signBoardBatches$: Observable<SignBoardBatch[]>;
  signBoardEntities$: Observable<{ [id: string]: SignBoard }>;
  signBoardBatchEntities$: Observable<{ [id: string]: SignBoardBatch }>;
  loadCampaign$: Observable<any>;
  constructor(private store: Store<ApplicationState>) {
    const user: any = new Function('return ' + localStorage.getItem('sb-user'));
    this.agencies$ = this.store.select(fromAgencySelector.selectAll);
    this.agencyEntities$ = this.store.select(fromAgencySelector.selectEntities);
    this.outlets$ = this.store.select(fromOultetSelector.selectAll);
    this.outletEntities$ = this.store.select(fromOultetSelector.selectEntities);
    this.campaigns$ = this.store.select(fromCampaignSelector.selectAll);
    this.campaignEntities$ = this.store.select(fromCampaignSelector.selectEntities);
    this.userOrganisation$ = this.store.select(fromOrganisationSelector.selectById(user.organizationId));
    this.signBoards$ = this.store.select(fromSignBoardSelector.selectAll);
    this.signBoardEntities$ = this.store.select(fromSignBoardSelector.selectEntities);
    this.signBoardBatches$ = this.store.select(fromSignBoardBatchSelector.selectAll);
    this.signBoardBatchEntities$ = this.store.select(fromSignBoardBatchSelector.selectEntities);
    this.loadCampaign$ = this.store.select(fromCampaignSelector.selectLoading);
  }

  ngOnInit(): void {
  }

}
