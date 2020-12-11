import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ApplicationComponent } from './modules/application/application.component';
import { ReportComponent } from './modules/report/report.component';

const routes: Routes = [ {
  path: '',
  component: PageComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: {state: 'dashboard'}
    },
    {
      path: 'applications',
      component: ApplicationComponent,
      data: {state: 'applications'}
    },
    {
      path: 'reports',
      component: ReportComponent,
      data: {state: 'reports'}
    }
  ]
},
  {
    path: 'login',
    component: LoginComponent,
    data: {state: 'login'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
