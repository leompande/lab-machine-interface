import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from './add-edit/add-edit.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  loading$!: Observable<boolean>;


  tableConfigurations = {
    tableColumns: [
      { name: 'firstName', label: 'First Name' },
      { name: 'middleName', label: 'Middle Name' },
      { name: 'lastName', label: 'Last Name' },
      { name: 'email', label: 'Email' },

    ],
    tableCaption: ' ',
    tableNotifications: '',
    showBorder: true,
    allowPagination: true,
    actionIcons: { edit: false, delete: false, more: false },
    doneLoading: false,
    showSearch: true,
    deleting: {},
    empty_msg: 'No users'
  };
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }



  async onTableAction(action: { name: string, object: any }) {

    if (action.name == 'edit') {
      const dialogRef = this.dialog.open(AddEditUserComponent, {
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
    const dialogRef = this.dialog.open(AddEditUserComponent, {
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
