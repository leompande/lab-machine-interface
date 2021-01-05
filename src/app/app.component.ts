import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from './store';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from './shared/services/firebase/auth-service';
import { UpsertUser } from './store/user/actions/user.actions';
import { Go } from './store/router/router.action';
import { UserService } from './shared/services/model-services/user.service';
import { Location } from "@angular/common";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sign Board Management System';
  currentRoute: string;
  constructor(
    private store: Store<ApplicationState>,
    public router: Router,
    private userService: UserService){
      
      this.userService.subject.subscribe((response)=>{
        if (response.isLogedIn == true){
          localStorage.getItem('currentRoute') && localStorage.getItem('currentRoute') != '/login' ?this.router.navigateByUrl(localStorage.getItem('currentRoute')):this.router.navigateByUrl('dashboard');
        } else{
          this.router.navigateByUrl('/login');
        }
      });

      router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((rout: any)=>{
        localStorage
        .setItem('currentRoute',rout.url);
        });
  }

  
}
