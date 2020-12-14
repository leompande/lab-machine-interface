import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import * as agencySelector from '../../../store/agency/selectors/agency.selectors';
import * as organisationSelector from '../../../store/organisation/selectors/organisation.selectors';
import * as userSelector from '../../../store/user/selectors/user.selectors';
import { User } from 'src/app/store/user/reducers/user';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {

  users$: Observable<User[]>;
  userEntities$: Observable<{[id: string]: User}>;

  organisations$: Observable<Organisation[]>;
  organisationEntities$: Observable<{[id: string]: Organisation}>;
  agencies$: Observable<Agency[]>;
  agencyEntities$: Observable<{[id: string]: Agency}>;
  constructor(private store: Store<ApplicationState>) {  
    this.users$ = this.store.pipe(select(userSelector.selectAll));
    this.users$.subscribe(users=>console.log(users));
    this.userEntities$ = this.store.pipe(select(userSelector.selectEntities));
    this.agencies$ = this.store.pipe(select(agencySelector.selectAll));
    this.agencyEntities$ = this.store.pipe(select(agencySelector.selectEntities)); 
    this.organisations$ = this.store.pipe(select(organisationSelector.selectAll));
    this.organisationEntities$ = this.store.pipe(select(organisationSelector.selectEntities)); 
  
  }

  ngOnInit(): void {
  }


}
