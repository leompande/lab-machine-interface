import { Component, OnInit, Input } from '@angular/core';
import { AddEditAgencyComponent } from './add-edit/add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { AgencyService } from 'src/app/shared/services/model-services/agency.service';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {
  @Input()
  agencies!: Agency[];
  @Input() agencyEntities: any;
  @Input()
  organisations!: Organisation[];
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

  constructor(public dialog: MatDialog, private agencyService: AgencyService) { }

  ngOnInit(): void {
  }



  updateAgency(agencyId: string) {
    const dialogRef = this.dialog.open(AddEditAgencyComponent, {
      data: {
        currentObject: this.agencies.find(agency => agency.id == agencyId),
        organisations: this.organisations,
        agencies: this.agencies
      },
      width: '80%',
      maxHeight: '80%',
      disableClose: true,
      hasBackdrop: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  printArrival(data:any){

  }

  async deleteAgency(agencyId: any) {
    var agency = this.agencies.find(agent=>agent.id==agencyId);
    await this.agencyService.deleteAgency(agency, this.agencies.filter(agent=>agent.organisationId==agency?.organisationId)).toPromise();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEditAgencyComponent, {
      width: '95%',
      maxHeight: '80%',
      disableClose: true,
      hasBackdrop: true, data: {
        currentObject: null,
        organisations: this.organisations,
        agencies: this.agencies
      },
      closeOnNavigation: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }



}
