import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Outlet } from 'src/app/store/outlet/reducers/outlet';
import { FormGroup, FormControl } from '@angular/forms';
import { makeId } from 'src/app/shared/helpers';
import { OutletService } from 'src/app/shared/services/model-services/outlet.service';
import { ListItem } from 'src/app/shared/components/one-sided-multi-select/one-sided-multi-select.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditOutletComponent implements OnInit {
  isUpdate: boolean = false;
  form!: FormGroup;
  loading: boolean = false;
  orgunit_tree_config: any = {
    show_search: true,
    show_levels: false,
    search_text: 'Search',
    level: null,
    loading: true,
    loading_message: 'Loading Organization units...',
    multiple: false,
    multiple_key: 'none',
    placeholder: 'Select Ward',
    openUserOu: false
  };

  orgUnitData: {
    wardId: string,
    ward: string,
    district: string,
    region: string
  };
  startingOus: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { currentObject: any }, private outletService: OutletService, private http: HttpClient) {
    this.isUpdate = data.currentObject != null;
    this.startingOus = data.currentObject?[data.currentObject.wardId]:null;
    this.form = new FormGroup({
      id: new FormControl(this.isUpdate ? data.currentObject.id : makeId()),
      name: new FormControl(this.isUpdate ? data.currentObject.name : ''),
      street: new FormControl(this.isUpdate ? data.currentObject.street : ''),
      ward: new FormControl(this.isUpdate ? data.currentObject.ward : ''),
      latitude!: new FormControl(this.isUpdate ? data.currentObject.latitude : ''),
      longitude!: new FormControl(this.isUpdate ? data.currentObject.longitude : ''),
      box!: new FormControl(this.isUpdate ? data.currentObject.box : ''),
      email!: new FormControl(this.isUpdate ? data.currentObject.email : ''),
      phone!: new FormControl(this.isUpdate ? data.currentObject.phone : ''),
      ownership!: new FormControl(this.isUpdate ? data.currentObject.ownership : ''),
      ownerName!: new FormControl(this.isUpdate ? data.currentObject.ownerName : '')
    });
  }

  ngOnInit(): void {
  }

  async onOrgunitSelected(event: any) {
    if (event.value) {
      const data = await this.http.get("/api/organisationUnits/" + event.value + ".json?fields=id,name,parent[id,name,parent[id,name]]").toPromise();
      this.orgUnitData = {
        wardId: data['id'],
        ward: data ? data['name'] : "",
        district: data ? data['parent'] ? data['parent']['name'] : "" : "",
        region: data ? data['parent'] ? data['parent']['parent'] ? data['parent']['parent']['name'] : "" : "" : "",
      };
    }

  }

  async save() {
    this.loading = true;
    const formValue = {
      ...this.form.value,
      wardId: this.orgUnitData.wardId,
      ward:this.orgUnitData.ward,
      district: this.orgUnitData.district,
      region: this.orgUnitData.region
    };
    await this.outletService.saveOutlet(formValue).toPromise();
    this.loading = false;
    this.cancel();
  }

  cancel() {
    document.getElementById("closeButton")?.click();
  }

}
