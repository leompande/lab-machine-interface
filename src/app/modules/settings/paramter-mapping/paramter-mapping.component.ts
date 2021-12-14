import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import * as _ from 'lodash';
import { MatInput } from '@angular/material/input';
@Component({
  selector: 'app-paramter-mapping',
  templateUrl: './paramter-mapping.component.html',
  styleUrls: ['./paramter-mapping.component.scss']
})
export class ParamterMappingComponent implements OnInit {

  constructor(private http: HttpClientService) { }
  paramters: any;
  ngOnInit(): void {
    this.getServerParameters();
  }

  getServerParameters() {
    this.http.get("/api/parameters/mappings").subscribe((response: any) => {
      this.paramters = response;
    }, (error: any) => {
      console.log(error);
    });
 }

  saveMapping(count: number, parameterIndex: number, memberIndex: number, item: any) {
    this.paramters.setMembers[count].setMembers[parameterIndex].setMembers[memberIndex] = {
      ...this.paramters.setMembers[count].setMembers[parameterIndex].setMembers[memberIndex],
      mapped: (document.getElementById(item.uuid) as HTMLInputElement).value,
      loading: true
    };
    var item = _.cloneDeep(this.paramters.setMembers[count].setMembers[parameterIndex].setMembers[memberIndex]);
    delete item['loading'];
    var parameters = this.paramters;
    parameters.setMembers[count].setMembers[parameterIndex].setMembers[memberIndex] = item;
    this.http.post("/api/parameters/mappings", parameters).subscribe((response: any) => {
      this.paramters.setMembers[count].setMembers[parameterIndex].setMembers[memberIndex] = {
        ...this.paramters.setMembers[count].setMembers[parameterIndex].setMembers[memberIndex],
        loading: false
      };
    }, (error: any) => {
      this.paramters.setMembers[count].setMembers[parameterIndex].setMembers[memberIndex] = {
        ...this.paramters.setMembers[count].setMembers[parameterIndex].setMembers[memberIndex],
        loading: false
      };
    });
  }

  resetMapping(){
    this.http.get("/api/parameters/reset-mapping").subscribe((response:any)=>{
      this.getServerParameters();
    },(error:any)=>{
      
    });
  }
}
