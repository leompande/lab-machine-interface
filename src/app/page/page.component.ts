import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/firebase/auth-service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UserService } from '../shared/services/model-services/user.service';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../store';
import { routeAnimations } from '../shared/animations/router-animation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../store/user/reducers/user';
import { menus } from '../shared/constants';
import { LoadOrganisations } from '../store/organisation/actions/organisation.actions';
import { LoadAgencies } from '../store/agency/actions/agency.actions';
import { LoadUsers } from '../store/user/actions/user.actions';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  animations: [routeAnimations]
})
export class PageComponent  {
  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(map(result => result.matches));
menus = [];
isOpen = true;
user!: User;
loading$!: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private store: Store<ApplicationState>,
  ) {
    localStorage.getItem('sb-web-token') !=null?this.userService.subject.next({isLogedIn: true, userData:null}):this.userService.subject.next({isLogedIn: false, userData:null});
    if (localStorage.getItem('sb-user')){
      this.user = new Function("return "+localStorage.getItem('sb-user'))();
      this.menus = menus.filter((menu:any)=>menu.access.indexOf(this.user.roleId)>=0);
      console.log(this.menus);
      console.log(this.user);
    }else{
      this.userService.logout();
    }
    this.store.dispatch(new LoadOrganisations());
    this.store.dispatch(new LoadAgencies());
    this.store.dispatch(new LoadUsers);
  }

  logout() {
    this.userService.logout();
  }
}
