import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import { groupData, getTableHeaders, getMachines } from 'src/app/shared/helpers';
import { fadeIn } from 'src/app/shared/animations/router-animation';
import { Sample } from '../sample-manager/sample-manager.component';
import * as _ from "lodash";

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
  animations: [fadeIn]
})
export class DataViewComponent implements OnInit {
  results: any[] = [];
  headers: string[];
  machines: string[];
  searchText: string;
  loadingResults: boolean = false;
  isFetching: boolean = false;
  samples: any[] = [];
  testParameters: any[] = [];
  currentDiv = null;
  constructor(private http: HttpClientService) { }

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
        { name: "patientName", label: "Patient Name", type: 'string' },
        { name: "patientId", label: "Patient Id", type: 'string' },
        { name: "WBC", label: "WBC", type: 'string' },
        { name: "WOC*", label: "WOC*", type: 'string' },
        { name: "NOC*", label: "NOC*", type: 'string' },
        { name: "NEU", label: "NEU", type: 'string' },
        { name: "LYM", label: "LYM", type: 'string' },
        { name: "MONO", label: "MONO", type: 'string' },
        { name: "EOS", label: "EOS", type: 'string' },
        { name: "BASO", label: "BASO", type: 'string' },
        { name: "%N", label: "%N", type: 'string' },
        { name: "%L", label: "%L", type: 'string' },
        { name: "%M", label: "%M", type: 'string' },
        { name: "%E", label: "%E", type: 'string' },
        { name: "%B", label: "%B", type: 'string' },
        { name: "RBC", label: "RBC", type: 'string' },
        { name: "HGB", label: "HGB", type: 'string' },
        { name: "MCV", label: "MCV", type: 'string' },
        { name: "MCH", label: "MCH", type: 'string' },
        { name: "MCHC", label: "MCHC", type: 'string' },
        { name: "HCT", label: "HCT", type: 'string' },
        { name: "RDW", label: "RDW", type: 'string' },
        { name: "PLT", label: "PLT", type: 'string' },
        { name: "MPV", label: "MPV", type: 'string' },
        { name: "PDW*", label: "PDW*", type: 'string' },
        { name: "PCT*", label: "PCT*", type: 'string' },
        { name: "%R", label: "%R", type: 'string' },
        { name: "RETC", label: "RETC", type: 'string' },
        { name: "RBGD", label: "RBGD", type: 'string' },
        { name: "DFLT(N)", label: "DFLT(N)", type: 'string' },
        { name: "DFLT(L)", label: "DFLT(L)", type: 'string' },
        { name: "DFLT(M)", label: "DFLT(M)", type: 'string' },
        { name: "DFLT(E)", label: "DFLT(E)", type: 'string' },
        { name: "DFLT(B)", label: "DFLT(B)", type: 'string' },
        { name: "LRI", label: "LRI", type: 'string' },
        { name: "URI", label: "URI", type: 'string' },
        { name: "Fragile RBC", label: "Fragile RBC", type: 'string' },
        { name: "Too Few Events", label: "Too Few Events", type: 'string' },
        { name: "ERL", label: "ERL", type: 'string' },
        { name: "BAND", label: "BAND", type: 'string' },
        { name: "IG", label: "IG", type: 'string' },
        { name: "BLAST", label: "BLAST", type: 'string' },
        { name: "VAR LYM", label: "VAR LYM", type: 'string' },
        { name: "FWBC", label: "FWBC", type: 'string' },
        { name: "NWBC", label: "NWBC", type: 'string' },
        { name: "NRBC", label: "NRBC", type: 'string' },
        { name: "RRBC", label: "RBC MORPH", type: 'string' },
        { name: "RBC MORPH", label: "Patient Name", type: 'string' },
        { name: "ATYP DEP", label: "ATYP DEP", type: 'string' },
      ],
      tableCaption: '',
      identifierColumn: null,
      allowPagination: true,
      tableNotifications: null,
      actionIcons: {
        edit: false,
        delete: false,
        more: false,
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

    this.getResults();
  }

  search() {
    console.log(this.searchText);
  }

  async getResults() {
    await this.http.get('/api/hospital').toPromise();
    this.getAllStaff();
  }

  async getAllStaff() {
    this.isFetching = true;
    await this.http.get('/api/samples/get-from-afyacare').toPromise();
    var samples: Sample[] = await this.http.get('/api/samples').toPromise();
    var patients: any[] = await this.http.get('/api/patients').toPromise();
    var orders: any[] = await this.http.get("/api/orders").toPromise();
    this.samples = samples.map((sample: any) => {
      try {
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
      } catch (e: any) {

      }

      return sample;
    });

    this.isFetching = false;
  }

  urinalysis(result: any) {
    return result.split(";")
  }

  onViewMore(more: any) {
    this.currentDiv = more;
    this.testParameters = [];
    var sample: any = this.samples.find((sample: any) => sample.id == more);
    this.http.get("/api/parameters").subscribe((response) => {
      var parameters: any[] = _.sortBy(response.filter((parameter: any) => {
        return parameter.orderId == sample.orderId && parameter.personId == sample.personId;
      }), (item: any) => item.parameterName);
      this.testParameters = parameters || [];
    });
  }

}
