import { HttpClientService } from './http-client.service';
import { Injectable } from '@angular/core';
import { getVisualizationCategories,getVisualizationSeries, combineVisualizationObject } from '../../helpers';
import * as _ from 'lodash';
@Injectable({ providedIn: 'root' })
export class VisualizationService {

  constructor(private http: HttpClientService) {
  }

  chartVisualizationUrl: string = "analytics.json?dimension=dx:bxJwD2nuyVY;nHx1IS7Z2D2;wE017rVSW5n&dimension=pe:";
  summaryVisualizationUrl: string = "analytics.json?dimension=dx:bxJwD2nuyVY;nHx1IS7Z2D2;wE017rVSW5n&dimension=pe:20210101;20210102;20210103;20210104;20210105;20210115;20210208&filter=ou:zs9X8YYBOnK";
  plantingStatusUrl: string = "";

  getDaysArray(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
}

getWeeksInAMonthArray(year, month){

}

  async getDailyVisualizationObjects(startDate: string, endDate: string) {
    var daylist = this.getDaysArray(new Date(startDate),new Date(endDate));
    const periodString = _.replace(daylist.map((v)=>v.toISOString().slice(0,10)).join(";").toString(),new RegExp('-','g'),"");
    const url = this.chartVisualizationUrl+periodString+"&filter=ou:zs9X8YYBOnK";
    const response = await this.http.get(url).toPromise();
    const categories = getVisualizationCategories('pe',response.metaData);
    const series = getVisualizationSeries('dx', 'pe',response.metaData,response.rows,response.headers);
    console.log(series);
    return combineVisualizationObject(categories,series);
  }

  async getMonthlyVisualizationObjects(year: string, month: string) {
    var daylist = this.getWeeksInAMonthArray(year,month);
    const periodString = _.replace([].map((v)=>v.toISOString().slice(0,10)).join(";").toString(),new RegExp('-','g'),"");
    const url = this.chartVisualizationUrl+periodString+"&filter=ou:zs9X8YYBOnK";
    const response = await this.http.get(url).toPromise();
    const categories = getVisualizationCategories('pe',response.metaData);
    const series = getVisualizationSeries('dx', 'pe',response.metaData,response.rows,response.headers);
    console.log(series);
    return combineVisualizationObject(categories,series);
  }

  async getYealyVisualizationObjects(year: number) {
    const periodString = ['01','02','03','04','05','06','07','08','09','10','11'].map(moth=>year+""+moth).join(";");
    const url = this.chartVisualizationUrl+periodString+"&filter=ou:zs9X8YYBOnK";
    const response = await this.http.get(url).toPromise();
    const categories = getVisualizationCategories('pe',response.metaData);
    const series = getVisualizationSeries('dx', 'pe',response.metaData,response.rows,response.headers);
    return combineVisualizationObject(categories,series);
  }

  async get5YealyVisualizationObjects(fiveYearly: string) {
    const arrayItems = fiveYearly.split('-');
    let periodString = "";
    for (let i = (+arrayItems[0]); i>=(+arrayItems[1]);i--){
      periodString+=i+";";
    }
    periodString = periodString.substring(0,periodString.length-1);
    const url = this.chartVisualizationUrl+periodString+"&filter=ou:zs9X8YYBOnK";
    const response = await this.http.get(url).toPromise();
    const categories = getVisualizationCategories('pe',response.metaData);
    const series = getVisualizationSeries('dx', 'pe',response.metaData,response.rows,response.headers);
    return combineVisualizationObject(categories,series);
  }

  getDefaultVisualizationObjects() {
    console.log("ABCD");
  }
}
