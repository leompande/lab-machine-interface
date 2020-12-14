import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from './store';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/firebase/auth-service';
import { UpsertUser } from './store/user/actions/user.actions';
import { Go } from './store/router/router.action';
import { UserService } from './shared/services/model-services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sign Board Management System';
  constructor(
    private store: Store<ApplicationState>,
    public router: Router,
    private userService: UserService){

      this.userService.subject.subscribe(response=>{
        console.log(this.router.routerState);
        if (response.isLogedIn == true){
          this.router.navigateByUrl('/dashboard');
          
        } else{
          this.router.navigateByUrl('/login');
        }
      });
      // dataService.app.auth().onAuthStateChanged(user => {
      //   if (user) {
      //     console.log("User",user.uid);
      //     // this.store.dispatch(new SetCurrentUser(user.uid));
      //     this.dataService.getOne([{
      //       left: 'uid', operator: '==', right: user.uid
      //     }], 'users').then((data: any) => {
      //       if (data.uid) {
      //         // this.store.dispatch(new UpsertCurrentUser({currentUser: data}));
      //         // this.store.dispatch(new UpsertUser({user : data}));
      //         if (this.router.url === '/login') {
      //           if (data.user_level === 'normal') {
      //             this.store.dispatch(new Go({path: ['/apply']}));
      //           } else {
      //             this.store.dispatch(new Go({path: ['/dashboard']}));
      //           }
      //         } else {
      //           this.store.dispatch(new Go({path: [this.router.url]}));
      //         }
      //       } else {
      //         if (this.router.url === '/login') {
      //           this.store.dispatch(new Go({path: ['/dashboard']}));
      //         } else {
      //           this.store.dispatch(new Go({path: [this.router.url]}));
      //         }
      //         // this.saveNewUser(user);
      //       }
      //     });
      //   } else {
      //     this.store.dispatch(new Go({path: ['login']}));
      //   }
      // });
  
  }

  
}
