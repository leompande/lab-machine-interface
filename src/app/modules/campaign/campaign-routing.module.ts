import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CampaignComponent } from './campaign.component';
import { CampaignContainerComponent } from './campaign-container/campaign-container.component';

const routes: Routes = [{
  path: '',
  component: CampaignContainerComponent,
  children: [
    
  ]
}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CampaignRoutingModule { }
