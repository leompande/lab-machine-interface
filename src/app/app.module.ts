import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
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
import { UserEffects } from './store/user/effects/user.effects';
import { SignBoardEffects } from './store/sign-board/effects/sign-board.effects';
import { ApplicationEffects } from './store/application/effects/application.effects';
import { OrganisationEffects } from './store/organisation/effects/organisation.effects';
import { UserRoleEffects } from './store/user-role/effects/user-role.effects';
import { PageComponent } from './page/page.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ApplicationComponent } from './modules/application/application.component';
import { ReportComponent } from './modules/report/report.component';
import { SettingComponent } from './modules/setting/setting.component';
import { SharedModule } from './shared/shared.module';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { OrganisationComponent } from './modules/organisation/organisation.component';
import { AgencyComponent } from './modules/agency/agency.component';
import { AgencyContainerComponent } from './modules/agency/agency-container/agency-container.component';
import { UserContainerComponent } from './modules/user/user-container/user-container.component';
import { UserComponent } from './modules/user/user.component';
import { OrganisationContainerComponent } from './modules/organisation/organisation-container/organisation-container.component';
import { AddEditOrganisationComponent } from './modules/organisation/add-edit/add-edit.component';
import { AddEditAgencyComponent } from './modules/agency/add-edit/add-edit.component';
import { AddEditUserComponent } from './modules/user/add-edit/add-edit.component';
import { MainDataTableComponent } from './shared/components/main-data-table/main-data-table.component';
import { AgencyEffects } from './store/agency/effects/agency.effects';
import { AddEditCampaignComponent } from './modules/campaign/add-edit/add-edit.component';
import { CampaignEffects } from './store/campaign/effects/campaign.effects';
import { SignBoardComponent } from './modules/sign-board/sign-board.component';
import { SignBoardContainerComponent } from './modules/sign-board/sign-board-container/sign-board-container.component';
import { SignBoardMoreComponent } from './modules/sign-board/sign-board-more/sign-board-more.component';
import { OutletComponent } from './modules/outlet/outlet.component';
import { OutletContainerComponent } from './modules/outlet/outlet-container/outlet-container.component';
import { AddEditOutletComponent } from './modules/outlet/add-edit/add-edit.component';
import { effects } from './store/effects';
import { OutletMapPreviewComponent } from './modules/outlet/outlet-map-preview/outlet-map-preview.component';

@NgModule({
  declarations: [
    LoaderComponent,
    MainDataTableComponent,
    AppComponent,
    LoginComponent,
    PageComponent,
    DashboardComponent,
    ApplicationComponent,
    ReportComponent,
    SettingComponent,
    OrganisationComponent,
    AgencyComponent,
    AgencyContainerComponent,
    UserContainerComponent,
    UserComponent,
    OrganisationContainerComponent,
    AddEditOrganisationComponent,
    AddEditAgencyComponent,
    AddEditUserComponent,
    AddEditCampaignComponent,
    SignBoardComponent,
    SignBoardContainerComponent,
    SignBoardMoreComponent,
    OutletComponent,
    OutletContainerComponent,
    AddEditOutletComponent,
    OutletMapPreviewComponent
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
  ],
  exports:[
    SharedModule
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
