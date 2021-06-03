import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import { groupData, getTableHeaders, getMachines } from 'src/app/shared/helpers';


@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss']
})
export class DataViewComponent implements OnInit {
  results: any;
  headers: string[];
  machines: string [];
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
    tableColumns: [],
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

    this.http.get('/api/results').subscribe((response)=>{
      this.results = groupData(response);
      this.tableConfigurations.tableColumns = getTableHeaders(response[0]);
      this.machines = getMachines(this.results);
    });
  }

}
