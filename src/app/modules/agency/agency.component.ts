import { Component, OnInit, Input } from '@angular/core';
import { AddEditAgencyComponent } from './add-edit/add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Agency } from 'src/app/store/agency/reducers/agency';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {
  @Input()
  agencies!: Agency[];
  @Input() agencyEntities: any;
  @Input() organisationEntities: any;
  @Input() loading$: Observable<boolean>;



  tableConfigurations = {
    tableColumns: [
      { name: 'name', label: 'Name' },
      { name: 'tin', label: 'TIN', type:'TEXT' },
      { name: 'vrn', label: 'VRN', type:'TEXT' },
      { name: 'address', label: 'Address' },
      { name: 'email', label: 'Email' },
      { name: 'phone', label: 'Phone' },
      { name: 'organisationName', label: 'Organisation' },
      { name: 'logo', label: 'Logo' },
    ],
    tableCaption: ' ',
    tableNotifications: '',
    showBorder: true,
    allowPagination: true,
    actionIcons: { edit: true, delete: true, more: false },
    doneLoading: false,
    showSearch: true,
    deleting: {},
    empty_msg: 'No Agencies'
  };

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }



}
