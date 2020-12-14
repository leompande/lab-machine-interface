import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import * as agencySelector from '../../../store/agency/selectors/agency.selectors';
import * as organisationSelector from '../../../store/organisation/selectors/organisation.selectors';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';

@Component({
  selector: 'app-agency-container',
  templateUrl: './agency-container.component.html',
  styleUrls: ['./agency-container.component.scss']
})
export class AgencyContainerComponent implements OnInit {

  organisations$: Observable<Organisation[]>;
  organisationEntities$: Observable<{[id: string]: Organisation}>;
  agencies$: Observable<Agency[]>;
  agencyEntities$: Observable<{[id: string]: Agency}>;
  constructor(private store: Store<ApplicationState>) {  
    this.agencies$ = this.store.pipe(select(agencySelector.selectAll));
    this.agencyEntities$ = this.store.pipe(select(agencySelector.selectEntities)); 
    this.organisations$ = this.store.pipe(select(organisationSelector.selectAll));
    this.organisationEntities$ = this.store.pipe(select(organisationSelector.selectEntities)); 
  
  }

  ngOnInit(): void {
  }

}
