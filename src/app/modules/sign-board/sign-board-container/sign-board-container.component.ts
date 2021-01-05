import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { SignBoard } from 'src/app/store/sign-board/reducers/sign-board';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../../../store';
import * as signBoardSelector from '../../../store/sign-board/selectors/sign-board.selectors';
import * as campaignSelector from '../../../store/campaign/selectors/campaign.selectors';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-sign-board-container',
  templateUrl: './sign-board-container.component.html',
  styleUrls: ['./sign-board-container.component.scss']
})
export class SignBoardContainerComponent implements OnInit {
  signBoards$: Observable<SignBoard[]>;
  signBoardEntities$: Observable<{ [id: string]: SignBoard }>
  constructor(private store: Store<ApplicationState>) {
    this.signBoards$ =
      combineLatest(
        this.store.select(campaignSelector.selectAll),
        this.store.select(signBoardSelector.selectAll),
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
    this.signBoardEntities$ = this.store.pipe(select(signBoardSelector.selectEntities));
  }

  ngOnInit(): void {
  }

}
