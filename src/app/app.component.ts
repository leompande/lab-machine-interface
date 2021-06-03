import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from './store';
import { Router, NavigationStart } from '@angular/router';
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
    public router: Router){

     

      router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((rout: any)=>{
        localStorage
        .setItem('currentRoute',rout.url);
        });
  }


}
