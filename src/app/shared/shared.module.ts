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
import { HeaderComponent } from './components/header/header.component';
import { SaveAreaComponent } from './components/save-area/save-area.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { OrgUnitFilterClosedComponent } from './components/org-unit-filter-closed/org-unit-filter-closed.component';
import { OrgUnitFilterComponent } from './components/org-unit-filter/org-unit-filter.component';
import { TreeModule } from '@circlon/angular-tree-component';
import { DragDropDirective } from './directives/drag-drop.directive';
import { FilterSignBoardPipe } from './pipes/filter-sign-board.pipe';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { BoardCollectorComponent } from './components/board-collector/board-collector.component';
import { AuthorizableActionDirective } from './directives/authorizable-action.directive';
import { LoaderComponent } from './components/loader/loader.component';
@NgModule({
  declarations: [
    OneSidedMultiSelectComponent,
    TwoSidedMultiSelectComponent,
    OrgUnitFilterClosedComponent,
    OrgUnitFilterComponent,
    HeaderComponent,
    FilterItemsPipe,
    FilterMultPipe,
    SearchPipe,
    SaveAreaComponent,
    SplitToArrayPipe,
    FormatNumberPipe,
    DragDropDirective,
    FilterSignBoardPipe,
    BoardCollectorComponent,AuthorizableActionDirective, LoaderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    TreeModule,
    NgxBarcode6Module,
  ],
  exports: [
    MaterialModule,
    BoardCollectorComponent,
    OneSidedMultiSelectComponent,
    TwoSidedMultiSelectComponent,
    OrgUnitFilterClosedComponent,
    OrgUnitFilterComponent,
    LoaderComponent,
    SaveAreaComponent,
    HeaderComponent,
    FilterItemsPipe,
    FilterMultPipe,
    SearchPipe,
    DragDropDirective,
    FilterSignBoardPipe,
    SplitToArrayPipe,
    FormatNumberPipe,
    AuthorizableActionDirective,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    TreeModule,
    NgxBarcode6Module
  ],
  entryComponents: [],

})
export class SharedModule { }
