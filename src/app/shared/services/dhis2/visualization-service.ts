import { HttpClientService } from './http-client.service';
import { Injectable } from '@angular/core';
import { getVisualizationCategories, getVisualizationSeries, combineChartVisualizationObject, getSum } from '../../helpers';
import * as _ from 'lodash';
@Injectable({ providedIn: 'root' })
export class VisualizationService {

  constructor(private http: HttpClientService) {
  }

  chartVisualizationUrl: string = "analytics.json?dimension=dx:nHx1IS7Z2D2;pd8m3fhzpUC;bxJwD2nuyVY;wE017rVSW5n&dimension=pe:";
  plantingStatusUrl: string = "";

  getDaysArray(start, end) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  }

  getWeeksInAMonthArray(year, month) {

  }

  async getDailyVisualizationObjects(startDate: string, endDate: string) {
    var daylist = this.getDaysArray(new Date(startDate), new Date(endDate));
    const periodString = _.replace(daylist.map((v) => v.toISOString().slice(0, 10)).join(";").toString(), new RegExp('-', 'g'), "");
    const url = this.chartVisualizationUrl + periodString + "&filter=ou:zs9X8YYBOnK";
    const response = await this.http.get(url).toPromise();
    const categories = getVisualizationCategories('pe', response.metaData);
    const series = getVisualizationSeries('dx', 'pe', response.metaData, response.rows, response.headers);
    return {chart:combineChartVisualizationObject(categories, series),table:this.getTable(series)};
  }

  async getMonthlyVisualizationObjects(year: string, month: string) {
    const periodString = _.replace([].map((v) => v.toISOString().slice(0, 10)).join(";").toString(), new RegExp('-', 'g'), "");
    const url = this.chartVisualizationUrl + periodString + "&filter=ou:zs9X8YYBOnK";
    const response = await this.http.get(url).toPromise();
    const categories = getVisualizationCategories('pe', response.metaData);
    const series = getVisualizationSeries('dx', 'pe', response.metaData, response.rows, response.headers);
    return {chart:combineChartVisualizationObject(categories, series),table:this.getTable(series)};
  }

  async getYealyVisualizationObjects(year: number) {
    const periodString = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'].map(moth => year + "" + moth).join(";");
    const url = this.chartVisualizationUrl + periodString + "&filter=ou:zs9X8YYBOnK";
    const response = await this.http.get(url).toPromise();
    const categories = getVisualizationCategories('pe', response.metaData);
    const series = getVisualizationSeries('dx', 'pe', response.metaData, response.rows, response.headers);
    return {chart:combineChartVisualizationObject(categories, series),table:this.getTable(series)};
  }

  async get5YealyVisualizationObjects(fiveYearly: string) {
    const arrayItems = fiveYearly.split('-');
    let periodString = "";
    for (let i = (+arrayItems[0]); i >= (+arrayItems[1]); i--) {
      periodString += i + ";";
    }
    periodString = periodString.substring(0, periodString.length - 1);
    const url = this.chartVisualizationUrl + periodString + "&filter=ou:zs9X8YYBOnK";
    const response = await this.http.get(url).toPromise();
    const categories = getVisualizationCategories('pe', response.metaData);
    const series = getVisualizationSeries('dx', 'pe', response.metaData, response.rows, response.headers);
    return {chart:combineChartVisualizationObject(categories, series),table:this.getTable(series)};
  }

  getTable(series){
    return {
      totalBoards: getSum(series,"Total number of signboards"),
      notPlantedBoards: getSum(series,"Number of signboards not planted"),
      assignedSignBoards: getSum(series,"Number of signboards assigned"),
      plantedVerifiedBoards: getSum(series,"Number of signboards planted"),
    }
  }

  getDefaultVisualizationObjects() {
    console.log("ABCD");
  }
}
