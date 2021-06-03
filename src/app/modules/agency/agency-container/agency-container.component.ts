import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import * as agencySelector from '../../../store/agency/selectors/agency.selectors';

@Component({
  selector: 'app-agency-container',
  templateUrl: './agency-container.component.html',
  styleUrls: ['./agency-container.component.scss']
})
export class AgencyContainerComponent implements OnInit {

  agencies$: Observable<Agency[]>;
  agencyEntities$: Observable<{ [id: string]: Agency }>;
  loading$: Observable<any>;
  constructor(private store: Store<ApplicationState>) {
    this.agencies$ = this.store.pipe(select(agencySelector.selectAll));
    this.agencyEntities$ = this.store.pipe(select(agencySelector.selectEntities));
    this.loading$ = this.store.pipe(select(agencySelector.selectLoading));

  }

  ngOnInit(): void {
  }

}
