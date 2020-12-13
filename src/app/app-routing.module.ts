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

const routes: Routes = [{
  path: '',
  component: PageComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: { state: 'dashboard' }
    },
    {
      path: 'applications',
      component: ApplicationComponent,
      data: { state: 'applications' }
    },
    {
      path: 'reports',
      component: ReportComponent,
      data: { state: 'reports' }
    },
    {
      path: 'agency',
      component: AgencyContainerComponent,
      data: { state: 'agency' }
    },
    {
      path: 'organisation',
      component: OrganisationContainerComponent,
      data: { state: 'organisation' }
    },{
      path: 'users',
      component: UserContainerComponent,
      data: { state: 'users' }
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
