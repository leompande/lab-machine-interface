import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducers, metaReducers } from './store';
import { environment } from 'src/environments/environment';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomSerializer } from './store/router/router.reducer';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { firebaseConfig } from 'src/environments/firebase.config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { PageComponent } from './page/page.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { AgencyComponent } from './modules/agency/agency.component';
import { AgencyContainerComponent } from './modules/agency/agency-container/agency-container.component';
import { AddEditAgencyComponent } from './modules/agency/add-edit/add-edit.component';
import { MainDataTableComponent } from './shared/components/main-data-table/main-data-table.component';
import { effects } from './store/effects';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { GoogleMapsModule } from '@angular/google-maps';
import { DataViewComponent } from './modules/data-view/data-view.component';
import { SettingsComponent } from './modules/settings/settings.component';

export const MY_FORMATS = {
  parse: {
    dateInput: ['YYYY-MM-DD'],
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [
    MainDataTableComponent,
    AppComponent,
    PageComponent,
    DashboardComponent,
    AgencyComponent,
    AgencyContainerComponent,
    AddEditAgencyComponent,
    DataViewComponent,
    SettingsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    EffectsModule.forRoot(effects),
    NgxShimmerLoadingModule,
    GoogleMapsModule
  ],
  exports: [
    SharedModule
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }, { provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },],
  bootstrap: [AppComponent]
})
export class AppModule { }
