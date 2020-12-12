import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { LoaderComponent } from './components/loader/loader.component';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule
  ],
  entryComponents: [],

})
export class SharedModule { }
