import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ApplicationComponent } from './modules/application/application.component';
import { ReportComponent } from './modules/report/report.component';
import { AgencyContainerComponent } from './modules/agency/agency-container/agency-container.component';
import { OrganisationContainerComponent } from './modules/organisation/organisation-container/organisation-container.component';
import { UserContainerComponent } from './modules/user/user-container/user-container.component';
import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service';
import { SignBoardContainerComponent } from './modules/sign-board/sign-board-container/sign-board-container.component';
import { OutletContainerComponent } from './modules/outlet/outlet-container/outlet-container.component';
import { SignBoardBatchContainerComponent } from './modules/sign-board-batch/sign-board-bach-container/sign-board-batch-container.component';

const routes: Routes = [{
  path: '',
  component: PageComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: { state: 'dashboard', roles: 'SUPER_USER,ORGANISATION_ADMIN,AGENCY_ADMIN' }
    },
    {
      path: 'campaigns',
      loadChildren:
        () => import('./modules/campaign/campaign.module')
          .then(mod => mod.CampaignModule),
      data: { state: 'campaigns', roles: 'ORGANISATION_ADMIN' }
    }, {
      path: 'outlets',
      component: OutletContainerComponent,
      data: { state: 'outlets', roles: 'ORGANISATION_ADMIN' },
      canActivate: [AuthGuard]
    },
    {
      path: 'applications',
      component: ApplicationComponent,
      data: { state: 'applications', roles: '' },
      canActivate: [AuthGuard]
    },
    {
      path: 'reports',
      component: ReportComponent,
      data: { state: 'reports', roles: 'ORGANISATION_ADMIN,ORGANISATION_VERIFIER' },
      canActivate: [AuthGuard]
    },
    {
      path: 'agency',
      component: AgencyContainerComponent,
      data: { state: 'agency', roles: 'SUPER_USER,ORGANISATION_ADMIN' },
      canActivate: [AuthGuard]
    },
    {
      path: 'organisation',
      component: OrganisationContainerComponent,
      data: { state: 'organisation', roles: 'SUPER_USER' },
      canActivate: [AuthGuard]
    }, {
      path: 'users',
      component: UserContainerComponent,
      data: { state: 'users', roles: 'SUPER_USER,ORGANISATION_ADMIN,AGENCY_ADMIN' },
      canActivate: [AuthGuard]
    }, {
      path: 'signboardbaches',
      component: SignBoardBatchContainerComponent,
      data: { state: 'Sign Board Baches', roles: 'AGENCY_ADMIN' },
      canActivate: [AuthGuard]
    }
  ]
},
{
  path: 'login',
  component: LoginComponent,
  data: { state: 'login' }
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
