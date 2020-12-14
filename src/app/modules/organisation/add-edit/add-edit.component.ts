import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';
import { FormGroup, FormControl } from '@angular/forms';
import { makeId } from 'src/app/shared/helpers';
import { OrganisationService } from 'src/app/shared/services/model-services/organisation.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditOrganisationComponent implements OnInit {
  isUpdate: boolean = false;
  form!: FormGroup;
  loading: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { currentObject: Organisation },private organisationService: OrganisationService) {
    this.isUpdate = data.currentObject != null;
    this.form = new FormGroup({
      id:new FormControl(this.isUpdate ? data.currentObject.id : makeId()),
      name: new FormControl(this.isUpdate ? data.currentObject.name : ''),
      tin!: new FormControl(this.isUpdate ? data.currentObject.tin : ''),
      vrn!: new FormControl(this.isUpdate ? data.currentObject.vrn : ''),
      address!: new FormControl(this.isUpdate ? data.currentObject.address : ''),
      email!: new FormControl(this.isUpdate ? data.currentObject.email : ''),
      phone!: new FormControl(this.isUpdate ? data.currentObject.phone : ''),
      // logo!: new FormControl(this.isUpdate ? data.currentObject.logo : ''),
      // dateCreated!: new FormControl(this.isUpdate ? data.currentObject.dateCreated : ''),
      // dateUpdated: new FormControl(this.isUpdate ? data.currentObject.dateUpdated : ''),
      // createdBy!: new FormControl(this.isUpdate ? data.currentObject.createdBy : ''),
      // updatedBy!: new FormControl(this.isUpdate ? data.currentObject.updatedBy : '')
    });
  }

  ngOnInit(): void {
  }

  async save() {
    this.loading = true;
    await this.organisationService.saveOrganisation(this.form.value).toPromise();
    this.loading = false;
    this.cancel();
  }

  cancel() {
    document.getElementById("closeButton")?.click();
  }

}
