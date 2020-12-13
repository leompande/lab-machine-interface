import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { SaveAreaComponent } from './components/save-area/save-area.component';
import { OneSidedMultiSelectComponent } from './components/one-sided-multi-select/one-sided-multi-select.component';
import { TwoSidedMultiSelectComponent } from './components/two-sided-multi-select/two-sided-multi-select.component';
import { FilterItemsPipe } from './pipes/filter-items.pipe';
import { FilterMultPipe } from './pipes/filter-mult.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { SplitToArrayPipe } from './pipes/split-to-array.pipe';
@NgModule({
  declarations: [ OneSidedMultiSelectComponent, TwoSidedMultiSelectComponent,FilterItemsPipe,
    FilterMultPipe,
    SearchPipe,
    SplitToArrayPipe],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    OneSidedMultiSelectComponent,
    TwoSidedMultiSelectComponent,FilterItemsPipe,
    FilterMultPipe,
    SearchPipe,
    SplitToArrayPipe
  ],
  entryComponents: [],

})
export class SharedModule { }
