import { Component } from '@angular/core';
import { FirebaseDataService } from './shared/services/firebase-data.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from './store';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth-service';
import { UpsertUser } from './store/user/actions/user.actions';
import { Go } from './store/router/router.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sign Board Management System';
  constructor(
    private dataService: FirebaseDataService,
    private store: Store<ApplicationState>,
    public router: Router,
    private authService: AuthService){
      dataService.app.auth().onAuthStateChanged(user => {
        if (user) {
          console.log("User",user.uid);
          // this.store.dispatch(new SetCurrentUser(user.uid));
          this.dataService.getOne([{
            left: 'uid', operator: '==', right: user.uid
          }], 'users').then((data: any) => {
            if (data.uid) {
              // this.store.dispatch(new UpsertCurrentUser({currentUser: data}));
              // this.store.dispatch(new UpsertUser({user : data}));
              if (this.router.url === '/login') {
                if (data.user_level === 'normal') {
                  this.store.dispatch(new Go({path: ['/apply']}));
                } else {
                  this.store.dispatch(new Go({path: ['/dashboard']}));
                }
              } else {
                this.store.dispatch(new Go({path: [this.router.url]}));
              }
            } else {
              if (this.router.url === '/login') {
                this.store.dispatch(new Go({path: ['/dashboard']}));
              } else {
                this.store.dispatch(new Go({path: [this.router.url]}));
              }
              // this.saveNewUser(user);
            }
          });
        } else {
          this.store.dispatch(new Go({path: ['login']}));
        }
      });
  
  }

  
}
