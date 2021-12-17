import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/shared/animations/router-animation';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import { ParameterViewComponent } from 'src/app/shared/components/parameter-view/parameter-view.component';
import { MatDialog } from '@angular/material/dialog';
import * as _ from "lodash";
export interface Sample {
  sampleType: string;
  [key: string]: string
}

export interface SampleTab {
  name: string;
  samples: Sample[];
}
@Component({
  selector: 'app-sample-manager',
  templateUrl: './sample-manager.component.html',
  styleUrls: ['./sample-manager.component.scss'],
  animations: [fadeIn]
})
export class SampleManagerComponent implements OnInit {
  sampleTabs: SampleTab[] = [];
  samples: Sample[] = [];
  isFetching: boolean = false;
  message: string = "";

  parameters: any[] = [];
  constructor(private http: HttpClientService,
    public dialog: MatDialog) {
  }

  tableConfigurations: {
    tableColumns: Array<{ name: string; label: string, type?: string }>;
    identifierColumn?: string;
    tableCaption: string;
    allowPagination: boolean;
    tableNotifications: any;
    actionIcons: any;
    doneLoading: any;
    deleting: any;
    showSearch: boolean;
    showBorder: boolean;
    empty_msg: string;
    showMap: boolean;
    hideExport: boolean;
  } = {
      tableColumns: [
        {
          name: "patientId",
          label: "Patient ID",
          type: "string"
        }, {
          name: "patientName",
          label: "Patient Name",
          type: "string"
        },
        {
          name: "orderNumber",
          label: "Order Number",
          type: "string"
        },
        {
          name: "orderDate",
          label: "Order Date",
          type: "string"
        },
        {
          name: "sampleType",
          label: "Sample Type",
          type: "string"
        },
        {
          name: "sampleId",
          label: "Sample ID",
          type: "string"
        },
        {
          name: "status",
          label: "Status",
          type: "string"
        }
      ],
      tableCaption: '',
      identifierColumn: null,
      allowPagination: true,
      tableNotifications: null,
      actionIcons: {
        edit: false,
        delete: false,
        more: true,
        print: false,
        cancel: false,
      },
      doneLoading: false,
      deleting: {},
      showSearch: true,
      showBorder: true,
      empty_msg: 'No Data',
      showMap: false,
      hideExport: false
    }

  ngOnInit(): void {
    this.getSamples();
    this.runInterval();
  }

  fetchData() {
    this.refreshSample();
  }

  async getSamples() {
    await this.http.get('/api/hospital').toPromise();
    this.isFetching = true;
    this.getAllStaff();
  }

  runInterval(){
    setInterval(()=>{
      this.getAllStaff();
    },300000);
  }

  async getAllStaff(){
    await this.http.get('/api/samples/get-from-afyacare').toPromise();
    var samples: Sample[] = await this.http.get('/api/samples').toPromise();
    var patients: any[] = await this.http.get('/api/patients').toPromise();
    var orders: any[] = await this.http.get("/api/orders").toPromise();
    this.samples = samples.map((sample: any) => {
      try{
        var patient: any = patients.find((patient: any) => patient.id == sample.personId);
        var order: any = orders.find((order: any) => order.id == sample.orderId);
        var dateArray = (new Date(+order.orderDate));
        sample = {
          ...sample,
          patientName: patient?.givenName + " " + patient?.middleName + " " + patient?.familyName,
          patientId: patient?.patientId,
          orderNumber: order.orderId,
          orderDate: dateArray
        }
      } catch(e:any){

      }

      return sample;
    });

    this.isFetching = false;
  }

  refreshSample() {
    this.getAllStaff();
    // this.isFetching = true;
    // this.http.get('/api/samples/get-from-afyacare').subscribe((response: Sample[]) => {
    //   this.getSamples();
    //   // this.http.get('/api/patients').subscribe((responsePatients: any[]) => {
    //   //   console.log(responsePatients);
    //   //   this.isFetching = false;
    //   //   this.samples = response;
    //   //   this.message = "";

    //   // }, (error: any) => {
    //   //   this.isFetching = false;
    //   //   this.message = "Problem with afyacare server,could either problem with credentials, internet connection or afyacare server is down!"
    //   // });
    // }, (error: any) => {
    //   this.isFetching = false;
    //   this.message = "Problem with afyacare server,could either problem with credentials, internet connection or afyacare server is down!"
    // });
  }

  onViewMore(more: any) {
    var sample: any = this.samples.find((sample: any) => sample.id == more);
    this.http.get("/api/parameters").subscribe((response) => {
      var parameters: any[] = _.sortBy(response.filter((parameter: any) => {
        return parameter.orderId == sample.orderId && parameter.personId == sample.personId;
      }), (item: any) => item.parameterName);
      parameters = parameters || [];
      let dialogRef = this.dialog.open(ParameterViewComponent, {
        height: '700px',
        width: '100%',
        data: {
          sample: sample,
          parameters: parameters
        }
      });
    });
  }
}
