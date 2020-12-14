import { Component, OnInit } from '@angular/core';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import * as organisationSelector from '../../../store/organisation/selectors/organisation.selectors';

@Component({
  selector: 'app-organisation-container',
  templateUrl: './organisation-container.component.html',
  styleUrls: ['./organisation-container.component.scss']
})
export class OrganisationContainerComponent implements OnInit {

  organisations$: Observable<Organisation[]>;
  organisationEntities$: Observable<{[id: string]: Organisation}>;
  constructor(private store: Store<ApplicationState>) {  
    this.organisations$ = this.store.pipe(select(organisationSelector.selectAll));
    this.organisationEntities$ = this.store.pipe(select(organisationSelector.selectEntities)); 
  }

  ngOnInit(): void {
  }

}
