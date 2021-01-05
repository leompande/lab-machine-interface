import { Component, OnInit } from '@angular/core';
import { Outlet } from 'src/app/store/outlet/reducers/outlet';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import * as outletSelector from '../../../store/outlet/selectors/outlet.selectors';

@Component({
  selector: 'app-outlet-container',
  templateUrl: './outlet-container.component.html',
  styleUrls: ['./outlet-container.component.scss']
})
export class OutletContainerComponent implements OnInit {

  outlets$: Observable<Outlet[]>;
  outletEntities$: Observable<{[id: string]: Outlet}>;
  constructor(private store: Store<ApplicationState>) {  
    this.outlets$ = this.store.pipe(select(outletSelector.selectAll));
    this.outletEntities$ = this.store.pipe(select(outletSelector.selectEntities)); 
  }

  ngOnInit(): void {
  }

}
