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
import * as fromApplication from './store/application/reducers/application.reducer';
import { ApplicationEffects } from './store/application/effects/application.effects';
import * as fromOrganisation from './store/organisation/reducers/organisation.reducer';
import { OrganisationEffects } from './store/organisation/effects/organisation.effects';
import * as fromUserRole from './store/user-role/reducers/user-role.reducer';
import { UserRoleEffects } from './store/user-role/effects/user-role.effects';
import { PageComponent } from './page/page.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ApplicationComponent } from './modules/application/application.component';
import { ReportComponent } from './modules/report/report.component';
import { SettingComponent } from './modules/setting/setting.component';
import { SharedModule } from './shared/shared.module';
import { LoaderComponent } from './shared/components/loader/loader.component';

@NgModule({
  declarations: [
    LoaderComponent,
    AppComponent,
    LoginComponent,
    PageComponent,
    DashboardComponent,
    ApplicationComponent,
    ReportComponent,
    SettingComponent
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
    EffectsModule.forRoot([UserEffects, SignBoardEffects, ApplicationEffects, OrganisationEffects, UserRoleEffects]),
  ],
  exports:[
    SharedModule
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
