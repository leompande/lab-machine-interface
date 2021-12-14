import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../store';
import { routeAnimations } from '../shared/animations/router-animation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  menus = [
    { id: "data-view", url: "data-view", name: "Data View", icon: "data-view.png" },
    { id: "sample", url: "samples", name: "Samples", icon: "sample.png" },
    { id: "settings", url: "settings", name: "Settings", icon: "settings.png" }
  ];
  isOpen = true;
  loading$!: Observable<boolean>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<ApplicationState>,
  ) {

  }
}
