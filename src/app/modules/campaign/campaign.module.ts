import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './campaign.component';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignContainerComponent } from './campaign-container/campaign-container.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditSignBoardComponent } from './add-edit-sign-board/add-edit-sign-board.component';
import { SignBoardListComponent } from './sign-board-list/sign-board-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignBoardTableComponent } from './sign-board-table/sign-board-table.component';
import { SignboardMoreComponent } from './signboard-more/signboard-more.component';
import { BoardBatchComponent } from './board-batch/board-batch.component';
import { AddEditBoardBatchComponent } from './add-edit-board-batch/add-edit-board-batch.component';
import { BoardBatchMoreComponent } from './board-batch-more/board-batch-more.component';
@NgModule({
  declarations: [CampaignComponent, CampaignContainerComponent, AddEditSignBoardComponent, SignBoardListComponent, SignBoardTableComponent, SignboardMoreComponent, BoardBatchComponent, AddEditBoardBatchComponent, BoardBatchMoreComponent],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    SharedModule
  ]
})
export class CampaignModule { }
