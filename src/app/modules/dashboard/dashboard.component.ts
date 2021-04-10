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
import * as Highcharts from 'highcharts';
import * as HighchartsExporting from 'highcharts/modules/exporting';
import { VisualizationService } from 'src/app/shared/services/dhis2/visualization-service';
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
  user: User;
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

  constructor(private store: Store<ApplicationState>, private visualizationService: VisualizationService) {
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

    // this.store.select(signBoardbatchSelector.selectTotalSignBoards(this.user.agency)).subscribe(results => {
    //   this.dashboardSummary.totalBoards = results;
    // });

    // this.store.select(signBoardbatchSelector.selectPlantedSignBoards(this.user.agency)).subscribe(results => {
    //   this.dashboardSummary.plantedSignBoards = results;
    // });

    // this.store.select(signBoardbatchSelector.selectNotPlantedSignBoards(this.user.agency)).subscribe(results => {
    //   this.dashboardSummary.notPlantedBoards = results;
    // });
    this.updateDashboardVisualization(this.currentPeriodType, null, null, null, null, this.currentFiveYearPeriod);

  }

  toggleShowFilters() {
    this.showFilters = true;
  }


  changePeriodType(event: any) {
    this.showStartEndDate = false;
    this.showMonthYear = false;
    this.showYears = false;
    this.show5Years = false;
    this.currentPeriodType = event.value;
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
        case '5Yearly':
          this.show5Years = true;
          break;
      default:
        break;
    }
    this.updateDashboardVisualization(this.currentPeriodType, null, null, event.value, null, null);
  }

  changeStartDate(event: any) {
    this.minDateEndDate = this.startDate;
    this.updateDashboardVisualization(this.currentPeriodType, this.startDate, this.endDate, null, null, null);
  }

  changeEndDate(event: any) {
    this.maxDateStartDate = this.endDate;
    this.updateDashboardVisualization(this.currentPeriodType, this.startDate, this.endDate, null, null, null);
  }

  change5YearPeriod(event: any){
    this.updateDashboardVisualization(this.currentPeriodType, null, null, null, null, event.value);
  }

  goNextYear() {
    this.years = get5Years('+', this.years[0], this.years[4]);
  }

  goPrevYear() {
    this.years = get5Years('-', this.years[4], this.years[0]);
  }


  async updateDashboardVisualization(type?: string, startDate?: Moment, endDate?: Moment, month?: any, year?: any, fiveYearly?:any) {
    if (type == 'Daily' && startDate != null && endDate != null) {
      const visualizationObjects = await this.visualizationService.getDailyVisualizationObjects(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
      this.dashboardSummary =  visualizationObjects.table;
      setTimeout(() => Highcharts.chart('summaryChartVisualization', visualizationObjects.chart), 400);
    }


    if (month != null) {
      console.log(month);
    }

    if (type == 'Yearly' && year != null) {
      const visualizationObjects = await this.visualizationService.getYealyVisualizationObjects(year);
      this.dashboardSummary =  visualizationObjects.table;
      setTimeout(() => Highcharts.chart('summaryChartVisualization', visualizationObjects.chart), 400);
    }

    if (type == '5Yearly' && fiveYearly != null) {
      const visualizationObjects = await this.visualizationService.get5YealyVisualizationObjects(fiveYearly);
      this.dashboardSummary =  visualizationObjects.table;
      setTimeout(() => Highcharts.chart('summaryChartVisualization', visualizationObjects.chart), 400);
    }
  }

  changeYear(event) {
    this.updateDashboardVisualization(this.currentPeriodType, null, null, null, event.value);
  }

  changeMonth(event) {
    this.updateDashboardVisualization(this.currentPeriodType, null, null, event.value, null);
  }

  ngOnInit() {
  }

}
