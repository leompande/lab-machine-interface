import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientService } from '../../services/http-client.service';
import * as _ from "lodash";
@Component({
  selector: 'app-parameter-view',
  templateUrl: './parameter-view.component.html',
  styleUrls: ['./parameter-view.component.scss']
})
export class ParameterViewComponent implements OnInit {

  //https://196.44.168.136/openmrs/ws/rest/v1/lab/results

  constructor(
    public dialogRef: MatDialogRef<ParameterViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClientService
  ) {
  }

  ngOnInit(): void {
  }

  async syncFunction(parameter: any) {

    var response = await this.http.post("api/afyacares/save-to-afya-care", parameter).toPromise();
    if(response.statusText=="OK"){
      this.http.get("/api/parameters").subscribe((results:any) => {
        var parameters: any[] = _.sortBy(results.filter((param: any) => {
          return param.orderId == this.data.sample.orderId && param.personId == this.data.sample.personId;
        }), (item: any) => item.parameterName);
        parameters = parameters || [];
        this.data.parameters = parameters;
      });
    }

  }

}
