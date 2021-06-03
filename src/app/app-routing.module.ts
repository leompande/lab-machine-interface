import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';
import { DataViewComponent } from './modules/data-view/data-view.component';
import { SettingsComponent } from './modules/settings/settings.component';

const routes: Routes = [{
  path: '',
  component: PageComponent,
  children: [
    {
      path: 'data-view',
      component: DataViewComponent,
    },
    {
      path: 'settings',
      component: SettingsComponent,
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'data-view'
    }
  ]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
