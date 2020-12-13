import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditOrganisationComponent } from '../organisation/add-edit/add-edit.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {

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
    actionIcons: { edit: false, delete: false, more: false },
    doneLoading: false,
    showSearch: true,
    deleting: {},
    empty_msg: 'No Organisation'
  };

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }



  async onTableAction(action: { name: string, object: any }) {

    if (action.name == 'edit') {
      const dialogRef = this.dialog.open(AddEditOrganisationComponent, {
        data:{
          currentObject:{name:""},

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

    if (action.name == 'delete') {
      // const reponse = await this.stockServce.delete(action.object.id).toPromise();
    }

  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEditOrganisationComponent, {
      width: '95%',
      maxHeight: '80%',
      disableClose: true,
      hasBackdrop: true, data: {name:""},
      closeOnNavigation: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


 


}
