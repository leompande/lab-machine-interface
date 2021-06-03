import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { ListItem } from 'src/app/shared/components/one-sided-multi-select/one-sided-multi-select.component';
import { makeId } from 'src/app/shared/helpers';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditAgencyComponent implements OnInit {
  isUpdate: boolean = false;
  form!: FormGroup;
  loading: boolean = false;
  availableItems: ListItem[] = [];
  selectedItems!: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: { currentObject: Agency,agencies: Agency[] }) {
    this.isUpdate = data.currentObject != null;

    this.form = new FormGroup({
      id: new FormControl(this.isUpdate ? data.currentObject.id : makeId()),
      name: new FormControl(this.isUpdate ? data.currentObject.name : ''),
      tin!: new FormControl(this.isUpdate ? data.currentObject.tin : ''),
      vrn!: new FormControl(this.isUpdate ? data.currentObject.vrn : ''),
      address!: new FormControl(this.isUpdate ? data.currentObject.address : ''),
      email!: new FormControl(this.isUpdate ? data.currentObject.email : ''),
      phone!: new FormControl(this.isUpdate ? data.currentObject.phone : ''),
      organisationId!: new FormControl(this.isUpdate ? data.currentObject.organisationId : ''),
      organisationName!: new FormControl(this.isUpdate ? data.currentObject.organisationName : ''),
      // logo!: new FormControl(this.isUpdate ? data.currentObject.logo : ''),
      // dateCreated!: new FormControl(this.isUpdate ? data.currentObject.dateCreated : ''),
      // dateUpdated: new FormControl(this.isUpdate ? data.currentObject.dateUpdated : ''),
      // createdBy!: new FormControl(this.isUpdate ? data.currentObject.createdBy : ''),
      // updatedBy!: new FormControl(this.isUpdate ? data.currentObject.updatedBy : '')
    });
  }

  ngOnInit(): void {
  }

  onSelectionDone(event: any[]){
    this.selectedItems = event;
  }

  async save() {
    this.loading = true;
    const formValue = {
      ...this.form.value
    };

    this.loading = false;
    this.cancel();
  }

  cancel() {
    document.getElementById("closeButton")?.click();
  }

}
