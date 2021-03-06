import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { OneSidedMultiSelectComponent } from './components/one-sided-multi-select/one-sided-multi-select.component';
import { TwoSidedMultiSelectComponent } from './components/two-sided-multi-select/two-sided-multi-select.component';
import { FilterItemsPipe, FilterResultPipe } from './pipes/filter-items.pipe';
import { FilterMultPipe } from './pipes/filter-mult.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { SplitToArrayPipe } from './pipes/split-to-array.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatNumberPipe } from './pipes/format-number.pipe';
import { HeaderComponent } from './components/header/header.component';
import { SaveAreaComponent } from './components/save-area/save-area.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TreeModule } from '@circlon/angular-tree-component';
import { DragDropDirective } from './directives/drag-drop.directive';
import { FilterSignBoardPipe } from './pipes/filter-sign-board.pipe';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { AuthorizableActionDirective } from './directives/authorizable-action.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { BatchMapperPipe } from './pipes/batch-mapper';
import { ParameterViewComponent } from './components/parameter-view/parameter-view.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    OneSidedMultiSelectComponent,
    TwoSidedMultiSelectComponent,
    HeaderComponent,
    FilterItemsPipe,
    FilterMultPipe,
    SearchPipe,
    SaveAreaComponent,
    SplitToArrayPipe,
    FormatNumberPipe,
    FilterResultPipe,
    DragDropDirective,
    FilterSignBoardPipe,
    BatchMapperPipe,AuthorizableActionDirective, LoaderComponent, ParameterViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    TreeModule,
    NgxBarcode6Module,
    HttpClientModule
  ],
  exports: [
    MaterialModule,
    OneSidedMultiSelectComponent,
    TwoSidedMultiSelectComponent,
    LoaderComponent,
    SaveAreaComponent,
    HeaderComponent,
    FilterItemsPipe,
    FilterMultPipe,
    FilterResultPipe,
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
