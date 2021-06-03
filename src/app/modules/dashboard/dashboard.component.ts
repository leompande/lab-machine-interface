import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import * as agencySelector from '../../store/agency/selectors/agency.selectors';
import { DashboardSummary, Status } from 'src/app/shared/models/dashboard-summary';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { get5Years, getMonths } from 'src/app/shared/helpers';
import { fadeIn } from 'src/app/shared/animations/router-animation';
import { Moment } from 'moment';
import * as Highcharts from 'highcharts';
import * as HighchartsExporting from 'highcharts/modules/exporting';
HighchartsExporting(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeIn]
})
export class DashboardComponent implements OnInit {

  dashboardSummary: DashboardSummary = {
    totalBoards: 0,
    assignedSignBoards: 0,
    plantedVerifiedBoards: 0,
    notPlantedBoards: 0
  }
  agencies: Agency[];
  statuses: Status[];

  showStartEndDate: boolean = false;
  showMonthYear: boolean = false;
  showYears: boolean = false;
  show5Years: boolean = true;

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

  options: Object;

  showFilters: boolean = false;

  currentPeriodType: string = "5Yearly";
  currentFiveYearPeriod: string = "2021-2016";

  constructor(private store: Store<ApplicationState>) {

  }

  ngOnInit() {
  }

}
