import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { OneSidedMultiSelectComponent } from './components/one-sided-multi-select/one-sided-multi-select.component';
import { TwoSidedMultiSelectComponent } from './components/two-sided-multi-select/two-sided-multi-select.component';
import { FilterItemsPipe } from './pipes/filter-items.pipe';
import { FilterMultPipe } from './pipes/filter-mult.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { SplitToArrayPipe } from './pipes/split-to-array.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatNumberPipe } from './pipes/format-number.pipe';
@NgModule({
  declarations: [OneSidedMultiSelectComponent, TwoSidedMultiSelectComponent, FilterItemsPipe,
    FilterMultPipe,
    SearchPipe,
    SplitToArrayPipe,FormatNumberPipe],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    OneSidedMultiSelectComponent,
    TwoSidedMultiSelectComponent, FilterItemsPipe,
    FilterMultPipe,
    SearchPipe,
    SplitToArrayPipe,FormatNumberPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [],

})
export class SharedModule { }
