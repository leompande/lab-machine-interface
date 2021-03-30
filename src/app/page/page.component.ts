import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UserService } from '../shared/services/model-services/user.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../store';
import { routeAnimations } from '../shared/animations/router-animation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../store/user/reducers/user';
import { menus } from '../shared/constants';
import { LoadOrganisations } from '../store/organisation/actions/organisation.actions';
import { LoadAgencies } from '../store/agency/actions/agency.actions';
import { LoadUsers } from '../store/user/actions/user.actions';
import { LoadCampaigns } from '../store/campaign/actions/campaign.actions';
import { LoadSignBoards } from '../store/sign-board/actions/sign-board.actions';
import { LoadOutlets } from '../store/outlet/actions/outlet.actions';
import { LoadSignBoardBatches } from '../store/sign-board-batch/actions/sign-board-batch.actions';
import { LoadAssignedBoardBatches } from '../store/assigned-board-batches/actions/assigned-board-batch.actions';
import { LoadOutletAssignments } from '../store/outlet-assignment/actions/outlet-assignment.actions';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  animations: [routeAnimations]
})
export class PageComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  menus = [];
  isOpen = true;
  user!: User;
  loading$!: Observable<boolean>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private store: Store<ApplicationState>,
  ) {
    localStorage.getItem('sb-web-token') != null ? this.userService.subject.next({ isLogedIn: true, userData: null }) : this.userService.subject.next({ isLogedIn: false, userData: null });
    if (localStorage.getItem('sb-user')) {
      this.user = new Function("return " + localStorage.getItem('sb-user'))();
      this.menus = menus.filter((menu: any) => menu.access.indexOf(this.user.roleId) >= 0);
    } else {
      this.userService.logout();
    }
    this.store.dispatch(new LoadOrganisations());
    this.store.dispatch(new LoadAgencies());
    this.store.dispatch(new LoadUsers);
    this.store.dispatch(new LoadCampaigns());
    this.store.dispatch(new LoadSignBoards());
    this.store.dispatch(new LoadSignBoardBatches());
    this.store.dispatch(new LoadOutlets());
    this.store.dispatch(new LoadAssignedBoardBatches());
    this.store.dispatch(new LoadOutletAssignments());
  }

  logout() {
    this.userService.logout();
  }
}
