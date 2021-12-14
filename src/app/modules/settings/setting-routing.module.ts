import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from './device/device.component';
import { MenuComponent } from './menu/menu.component';
import { ParamterMappingComponent } from './paramter-mapping/paramter-mapping.component';
import { SettingsComponent } from './settings.component';
import { SetupComponent } from './setup/setup.component';

const routes: Routes = [{
  path: '',
  component: SettingsComponent,
  children: [
    {
      path: 'menu',
      component: MenuComponent,
    },
    {
      path: 'parameter-mapping',
      component: ParamterMappingComponent,
    },
    {
      path: 'setup',
      component: SetupComponent,
    },
    {
      path: 'devices',
      component: DeviceComponent,
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'menu'
    }
  ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
