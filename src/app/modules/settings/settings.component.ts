import { Component, OnInit } from '@angular/core';
import { fadeIn, routeAnimations } from 'src/app/shared/animations/router-animation';
import { HttpClientService } from 'src/app/shared/services/http-client.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [fadeIn,routeAnimations]
})
export class SettingsComponent implements OnInit {

  constructor(private http: HttpClientService) { }

  ngOnInit(): void {
  }



}
