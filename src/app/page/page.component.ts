import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth-service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UserService } from '../shared/services/model-services/user.service';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../store';
import { routeAnimations } from '../shared/animations/router-animation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../store/user/reducers/user';
import { FirebaseDataService } from '../shared/services/firebase-data.service';

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

isOpen = true;
user$!: Observable<User>;
loading$!: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private store: Store<ApplicationState>,
    private dataService: FirebaseDataService
  ) {
    // this.user$ = this.store.pipe(select(selectCurrentUser));
  }

  logout() {
    this.dataService.logout();
  }
}
