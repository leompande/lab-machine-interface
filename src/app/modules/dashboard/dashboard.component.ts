import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import * as signBoardbatchSelector from '../../store/sign-board-batch/selectors/sign-board-batch.selectors';
import * as agencySelector from '../../store/agency/selectors/agency.selectors';
import { DashboardSummary, Status } from 'src/app/shared/models/dashboard-summary';
import { User } from 'src/app/store/user/reducers/user';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { get5Years, getMonths } from 'src/app/shared/helpers';
import { fadeIn } from 'src/app/shared/animations/router-animation';
import { Moment } from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeIn]
})
export class DashboardComponent implements OnInit {

  dashboardSummary: DashboardSummary = {
    totalBoards: 0,
    plantedSignBoards: 0,
    plantedVerifiedBoards: 0,
    notPlantedBoards: 0
  }
  user: User;
  agencies: Agency[];
  statuses: Status[];

  showStartEndDate: boolean = false;
  showMonthYear: boolean = false;
  showYears: boolean = false;

  years: { id: string, value: any, name: string }[];
  months: { id: string, value: any, name: string }[]
  currentYear: number = new Date().getFullYear();

  minDateStartDate: Date;
  maxDateStartDate: Date;

  minDateEndDate: Date;
  maxDateEndDate: Date;

  today: Date = new Date();

  startDate: any;
  endDate: any;

  constructor(private store: Store<ApplicationState>) {
    this.years = get5Years();
    this.months = getMonths();
    this.user = new Function("return " + localStorage.getItem('sb-user'))();

    this.maxDateStartDate = this.today;
    this.maxDateEndDate = this.today;

    this.store.select(agencySelector.selectAll).subscribe((results) => {
      this.agencies = results;
      if (this.user.agency == null) {
        this.store.select(signBoardbatchSelector.getStatus(this.agencies)).subscribe((results) => {
          this.statuses = results;
        });
      }
    });

    this.store.select(signBoardbatchSelector.selectTotalSignBoards(this.user.agency)).subscribe(results => {
      this.dashboardSummary.totalBoards = results;
    });

    this.store.select(signBoardbatchSelector.selectPlantedSignBoards(this.user.agency)).subscribe(results => {
      this.dashboardSummary.plantedSignBoards = results;
    });

    this.store.select(signBoardbatchSelector.selectNotPlantedSignBoards(this.user.agency)).subscribe(results => {
      this.dashboardSummary.notPlantedBoards = results;
    });
  }


  changePeriodType(event: any) {
    this.showStartEndDate = false;
    this.showMonthYear = false;
    this.showYears = false;
    switch (event.value) {
      case 'Daily':
        this.showStartEndDate = true;
        break;
      case 'Monthly':
        this.showMonthYear = true;
        break;
      case 'Yearly':
        this.showYears = true;
        break;
      default:
        break;
    }
  }

  changeStartDate(event: any) {
    this.minDateEndDate = this.startDate;
    this.updateDashboardVisualization(null, this.startDate,this.endDate,null, null);
  }

  changeEndDate(event: any) {
    this.maxDateStartDate = this.endDate;
    this.updateDashboardVisualization(null, this.startDate,this.endDate,null, null);
  }

  goNextYear() {
    this.years = get5Years('+', this.years[0], this.years[4]);
    console.log("Data next year");
  }

  goPrevYear() {
    this.years = get5Years('-', this.years[4], this.years[0]);
    console.log("Data prev year");
  }


  updateDashboardVisualization(type?: string, startDate?: Moment, endDate?: any, month?:any, year?: any){
    if ( startDate != null ) {
      console.log(startDate.calendar());
    }

    if ( endDate == null ){
      console.log(endDate);
    }
  }


  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  zoom = 3;
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    maxZoom: 15,
    minZoom: 6,
  }

  markers = [
  ];

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'white',
      },
    });
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 5) * 3) / 5,
        lng: this.center.lng + ((Math.random() - 5) * 3) / 5,
      },
      label: {
        color: 'white',
      },
    });
  }

  ngOnInit() {
    this.center = {
      lat: -6.3728253,
      lng: 34.8924826,
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
    this.addMarker();
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

}
