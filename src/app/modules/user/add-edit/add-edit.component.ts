import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/store/user/reducers/user';
import { ListItem } from 'src/app/shared/components/one-sided-multi-select/one-sided-multi-select.component';
import { roles } from 'src/app/shared/constants';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { UserService } from 'src/app/shared/services/model-services/user.service';
import { makeId } from 'src/app/shared/helpers';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditUserComponent implements OnInit {
  isUpdate: boolean = false;
  form!: FormGroup;
  loading: boolean = false;
  availableRoles: ListItem[] = roles.map((role) => {
    return {
      ...role,
      chosed: false
    }
  });
  availableOrganisations: ListItem[] = [];
  availableAgencies: ListItem[] = [];

  selectedOrganisation!: ListItem;
  selectedAgency!: ListItem;
  selectedRole!: ListItem;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { currentObject: User, agencies: Agency[], organisations: Organisation[] }, private userService: UserService) {
    this.isUpdate = data.currentObject != null;
    this.availableAgencies = data.agencies.map((agency) => {
      return {
        id: agency.id,
        name: agency.name,
        value: agency.name,
        chosed: false
      }
    });
    this.availableOrganisations = data.organisations.map((organisation) => {
      return {
        id: organisation.id,
        name: organisation.name,
        value: organisation.name,
        chosed: false
      }
    });
    this.form = new FormGroup({
      id: new FormControl(this.isUpdate?data.currentObject.id:makeId()),
      firstName: new FormControl(this.isUpdate ? data.currentObject.firstName : ''),
      middleName: new FormControl(this.isUpdate ? data.currentObject.middleName : ''),
      lastName: new FormControl(this.isUpdate ? data.currentObject.lastName : ''),
      username: new FormControl(this.isUpdate ? data.currentObject.username : ''),
      password: new FormControl(this.isUpdate ? data.currentObject.password : ''),
      phone: new FormControl(this.isUpdate ? data.currentObject.phone : ''),
      email: new FormControl(this.isUpdate ? data.currentObject.email : '')
    });
  }

  ngOnInit(): void {
  }

  onSelectionOrganisationDone(event: any) {
    this.selectedOrganisation=event[0];
  }

  onSelectionAgencyDone(event: any) {
    this.selectedAgency=event[0];
  }

  onSelectionRoleDone(event: any) {
    this.selectedRole=event[0];
  }

  async save() {
    this.loading = true;
    const userData = {
      ...this.form.value,
      organisation: this.selectedOrganisation?this.selectedOrganisation.name:null,
      dhisOrganisationUnitId: 'zs9X8YYBOnK',
      dhisCredentialsId: this.data.currentObject?this.data.currentObject.dhisCredentialsId:makeId(),
      dhisRoleId: 'aG8oolO8asO',
      role: this.selectedRole?this.selectedRole.name:'Super User',
      roleId: this.selectedRole?this.selectedRole.id:'SUPER_USER',
      agency: this.selectedAgency?this.selectedAgency.name:null,
      isAgencyUser: this.selectedAgency && this.selectedOrganisation?true:false,
      isOrganisationUser: !this.selectedAgency && this.selectedOrganisation?true:false,
      isSuperUser: !this.selectedAgency && !this.selectedOrganisation?true:false,
      organizationId: this.selectedOrganisation?this.selectedOrganisation.id:null,
      agencyId: this.selectedAgency?this.selectedAgency.id:null,
    }
    await this.userService.saveUser(userData).toPromise();
    this.loading = false;
    this.cancel();
  }


  cancel() {
    document.getElementById("closeButton")?.click();
  }

}
