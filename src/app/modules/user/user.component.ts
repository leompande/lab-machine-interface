import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from './add-edit/add-edit.component';
import { Observable } from 'rxjs';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';
import { User } from 'src/app/store/user/reducers/user';
import { UserService } from 'src/app/shared/services/model-services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  users!: User[];
  @Input() userEntities: any;
  @Input()
  agencies!: Agency[];
  @Input() agencyEntities: any;
  @Input()
  organisations!: Organisation[];
  @Input() organisationEntities: any;
  @Input() loading$: Observable<boolean>;


  tableConfigurations = {
    tableColumns: [
      { name: 'firstName', label: 'First Name' },
      { name: 'middleName', label: 'Middle Name' },
      { name: 'lastName', label: 'Last Name' },
      { name: 'email', label: 'Email' },
      { name: 'phone', label: 'Phone' },
      { name: 'username', label: 'Username' },
      { name: 'organisation', label: 'Organisation' },
      { name: 'agency', label: 'Agency' },
      { name: 'role', label: 'Role' },

    ],
    tableCaption: ' ',
    tableNotifications: '',
    showBorder: true,
    allowPagination: true,
    actionIcons: { edit: true, delete: true, more: false },
    doneLoading: false,
    showSearch: true,
    deleting: {},
    empty_msg: 'No users'
  };

  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
  }

  updateUser(userId: string) {

    const dialogRef = this.dialog.open(AddEditUserComponent, {
      data: {
        currentObject: this.users.find(user => user.id == userId),
        agencies: this.agencies,
        organisations: this.organisations

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

  async deleteUser(userId: any) {
    await this.userService.deleteUser(userId).toPromise();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '95%',
      maxHeight: '80%',
      disableClose: true,
      hasBackdrop: true, data: {

        currentObject: null,
        agencies: this.agencies,
        organisations: this.organisations
      },
      closeOnNavigation: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
