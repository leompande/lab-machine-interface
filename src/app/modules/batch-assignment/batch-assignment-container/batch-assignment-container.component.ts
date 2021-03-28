import { Component, OnInit } from '@angular/core';
import { AssignedBoardBatch } from 'src/app/store/assigned-board-batches/reducers/assigned-board-batch';
import { Observable, pipe } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import * as assignedBatchSelector from '../../../store/assigned-board-batches/selectors/assigned-board-batch.selectors';
import * as campaignSelector from '../../../store/campaign/selectors/campaign.selectors';
import * as signBoardBatchSelector from '../../../store/sign-board-batch/selectors/sign-board-batch.selectors';
import * as outletSelector from '../../../store/outlet/selectors/outlet.selectors';
import * as agencySelector from '../../../store/agency/selectors/agency.selectors';
import { Campaign } from 'src/app/store/campaign/reducers/campaign';
import { SignBoardBatch } from 'src/app/store/sign-board-batch/reducers/sign-board-batch';
import { Outlet } from 'src/app/store/outlet/reducers/outlet';
import { Agency } from 'src/app/store/agency/reducers/agency';

@Component({
  selector: 'app-batch-assignment-container',
  templateUrl: './batch-assignment-container.component.html',
  styleUrls: ['./batch-assignment-container.component.scss']
})
export class BatchAssignmentContainerComponent implements OnInit {

  assignedBatches$: Observable<AssignedBoardBatch[]>;
  assignedBatchEntities$: Observable<{ [id: string]: AssignedBoardBatch }>;
  assignedBatchLoading$: Observable<any>;
  campaings$: Observable<Campaign[]>;
  signBoardBatches$: Observable<SignBoardBatch[]>;
  outlets$: Observable<Outlet[]>;
  agencies$: Observable<Agency[]>;
  constructor(private store: Store<ApplicationState>) {
    this.assignedBatches$ = this.store.pipe(select(assignedBatchSelector.selectAll));
    this.assignedBatchEntities$ = this.store.pipe(select(assignedBatchSelector.selectEntities));
    this.assignedBatchLoading$ = this.store.pipe(select(assignedBatchSelector.selectLoading));
    this.campaings$ = this.store.pipe(select(campaignSelector.selectAll));
    this.signBoardBatches$ = this.store.pipe(select(signBoardBatchSelector.selectAll));
    this.outlets$ = this.store.pipe(select(outletSelector.selectAll));
    this.agencies$ = this.store.pipe(select(agencySelector.selectAll));
  }

  ngOnInit(): void {
  }

}
