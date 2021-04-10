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

  options: Object;

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
    this.updateDashboardVisualization(event.value, null, null, event.value, null);
  }

  changeStartDate(event: any) {
    this.minDateEndDate = this.startDate;
    this.updateDashboardVisualization(null, this.startDate, this.endDate, null, null);
  }

  changeEndDate(event: any) {
    this.maxDateStartDate = this.endDate;
    this.updateDashboardVisualization(null, this.startDate, this.endDate, null, null);
  }

  goNextYear() {
    this.years = get5Years('+', this.years[0], this.years[4]);
    console.log("Data next year");
  }

  goPrevYear() {
    this.years = get5Years('-', this.years[4], this.years[0]);
    console.log("Data prev year");
  }


  updateDashboardVisualization(type?: string, startDate?: Moment, endDate?: Moment, month?: any, year?: any) {
    if (startDate != null) {
      console.log(startDate.calendar());
    }

    if (endDate != null) {
      console.log(endDate.calendar());
    }

    if (month != null) {
      console.log(month);
    }

    if (year != null) {
      console.log(year);
    }
  }

  changeYear(event) {
    this.updateDashboardVisualization(null, null, null, null, event.value);
  }

  changeMonth(event) {
    this.updateDashboardVisualization(null, null, null, event.value, null);
  }






  ngOnInit() {
    setTimeout(() => Highcharts.chart('summaryChartVisualization', {

      title: {
        text: ''
      },

      subtitle: {
        text: ''
      },

      yAxis: {
        title: {
          text: 'Number of Sign Boards'
        }
      },

      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2010 to 2017'
        }
      },

      // legend: {
      //     layout: 'horizontal',
      //     align: 'bottom',
      //     verticalAlign: 'bottom'
      // },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2010
        }
      },

      series: [{
        name: 'Total number of signboards',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      }, {
        name: 'Number of signboards planted',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      }, {
        name: 'Number of signboards verified',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      }, {
        name: 'Number of signboards not planted',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          // chartOptions: {
          //     legend: {
          //         layout: 'horizontal',
          //         // verticalAlign: 'bottom'
          //     }
          // }
        }]
      }

    }), 400);
  }



}
