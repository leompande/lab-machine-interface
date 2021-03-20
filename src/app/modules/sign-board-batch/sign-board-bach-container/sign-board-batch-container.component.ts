import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../../../store';
import * as signBoardSelector from '../../../store/sign-board/selectors/sign-board.selectors';
import * as signBoardBatchSelector from '../../../store/sign-board-batch/selectors/sign-board-batch.selectors';
import * as fromOutletSelector from '../../../store/outlet/selectors/outlet.selectors';
import * as campaignSelector from '../../../store/campaign/selectors/campaign.selectors';
import { map } from 'rxjs/operators';
import { SignBoardBatch } from '../../../store/sign-board-batch/reducers/sign-board-batch';
import { Outlet } from '../../../store/outlet/reducers/outlet';

@Component({
  selector: 'app-sign-board-batch-container',
  templateUrl: './sign-board-batch-container.component.html',
  styleUrls: ['./sign-board-batch-container.component.scss']
})
export class SignBoardBatchContainerComponent implements OnInit {
  signBoardBatches$: Observable<SignBoardBatch[]>;
  signBoardBatchEntities$: Observable<{ [id: string]: SignBoardBatch }>;
  outlets$: Observable<Outlet[]>;
  outletEntities$: Observable<{ [id: string]: Outlet }>;
  loading$: Observable<boolean>;
  constructor(private store: Store<ApplicationState>) {
    this.outlets$ = this.store.select(fromOutletSelector.selectAll);
    this.signBoardBatches$ =
      combineLatest(
        this.store.select(campaignSelector.selectAll),
        this.store.select(signBoardBatchSelector.selectAll),
        (campaings, signBoards) => ({ campaings, signBoards })
      ).pipe(map((output) => {
        return output.signBoards.map((signBoard) => {
          const campaign = output.campaings.find((campaign) => campaign.reference == signBoard.campaign_reference_number);
          return {
            ...signBoard,
            campaign_name: campaign ? campaign.campaign_name : ''
          }
        });
      }));
    this.signBoardBatchEntities$ = this.store.pipe(select(signBoardBatchSelector.selectEntities));
    this.loading$ = this.store.pipe(select(signBoardBatchSelector.selectLoading));
  }

  ngOnInit(): void {
  }

}
