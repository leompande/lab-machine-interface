import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';
import { DataViewComponent } from './modules/data-view/data-view.component';
import { SampleManagerComponent } from './modules/sample-manager/sample-manager.component';

const routes: Routes = [{
  path: '',
  component: PageComponent,
  children: [
    {
      path: 'data-view',
      component: DataViewComponent,
    },
    {
      path: 'samples',
      component: SampleManagerComponent,
    },
    {
      path: 'settings',
      loadChildren: () => import('./modules/settings/settings.module').then(loadedModule => loadedModule.SettingsModule)
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
