import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { DeviceComponent } from "./device/device.component";
import { MenuComponent } from "./menu/menu.component";
import { ParamterMappingComponent } from "./paramter-mapping/paramter-mapping.component";
import { SettingRoutingModule } from "./setting-routing.module";
import { SettingsComponent } from "./settings.component";
import { SetupComponent } from "./setup/setup.component";


@NgModule({
  declarations: [
    SettingsComponent,
    SetupComponent,
    ParamterMappingComponent,
    DeviceComponent,
    MenuComponent,
  ],
  imports: [
    SharedModule,
    SettingRoutingModule
  ],
  exports: [
    SharedModule
  ],
  providers: [],
})
export class SettingsModule { }
