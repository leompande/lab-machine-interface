import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/store/user/reducers/user';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditUserComponent implements OnInit {
  isUpdate: boolean = false;
  form!: FormGroup;
  loading: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { currentObject: User }) {
    this.isUpdate = data.currentObject != null;
    this.form = new FormGroup({
      firstName: new FormControl(this.isUpdate ? data.currentObject.firstName : ''),
      middleName: new FormControl(this.isUpdate ? data.currentObject.middleName : ''),
      lastName: new FormControl(this.isUpdate ? data.currentObject.lastName : ''),
      phone: new FormControl(this.isUpdate ? data.currentObject.phone : ''),
      email: new FormControl(this.isUpdate ? data.currentObject.email : ''),
      organisation: new FormControl(this.isUpdate ? data.currentObject.organisation : ''),
      agency: new FormControl(this.isUpdate ? data.currentObject.agency : '')
    });
  }

  ngOnInit(): void {
  }

  save() {
    this.loading = true;
  }

  cancel() {
    document.getElementById("closeButton")?.click();
  }

}
