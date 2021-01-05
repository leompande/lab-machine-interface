import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditOrganisationComponent } from '../organisation/add-edit/add-edit.component';
import { Observable } from 'rxjs';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';
import { OrganisationService } from 'src/app/shared/services/model-services/organisation.service';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {
  @Input()
  organisations!: Organisation[];
  @Input() organisationEntities: any;
  loading$!: Observable<boolean>;

  tableConfigurations = {
    tableColumns: [
      { name: 'name', label: 'Name' },
      { name: 'tin', label: 'TIN' },
      { name: 'vrn', label: 'VRN' },
      { name: 'address', label: 'Address' },
      { name: 'email', label: 'Email' },
      { name: 'phone', label: 'Phone' },
      { name: 'logo', label: 'Logo' }

    ],
    tableCaption: ' ',
    tableNotifications: '',
    showBorder: true,
    allowPagination: true,
    actionIcons: { edit: true, delete: true, more: false },
    doneLoading: false,
    showSearch: true,
    deleting: {},
    empty_msg: 'No Organisations'
  };

  constructor(public dialog: MatDialog, private organisationService: OrganisationService) { }

  ngOnInit(): void {
  }




  updateOrganisation(organisationId: string) {
    const dialogRef = this.dialog.open(AddEditOrganisationComponent, {
      data: {
        currentObject: this.organisations.find(organisation => organisation.id == organisationId), 
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

  async deleteOrganisation(organisationId: any) {
    await this.organisationService.deleteOrganisation(organisationId).toPromise();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEditOrganisationComponent, {
      width: '95%',
      maxHeight: '80%',
      disableClose: true,
      hasBackdrop: true, data: {  },
      closeOnNavigation: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }





}
