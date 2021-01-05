import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';
import { OrganisationService } from 'src/app/shared/services/model-services/organisation.service';
import { makeId } from 'src/app/shared/helpers';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { ListItem } from 'src/app/shared/components/one-sided-multi-select/one-sided-multi-select.component';
import { CampaignService } from 'src/app/shared/services/model-services/campaign.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditCampaignComponent implements OnInit {

  isUpdate: boolean = false;
  form!: FormGroup;
  loading: boolean = false;
  availableAgencies: ListItem[];
  selectedAgency: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { currentObject: any, agencies: Agency[], reference: string, organisation: string }, private campaignService: CampaignService) {
    // this.availableAgencies = data.agencies.map((agency) => {
    //   return {
    //     id: agency.id,
    //     name: agency.name,
    //     value: agency.name,
    //     chosed: false
    //   }
    // });
    this.isUpdate = data.currentObject != null;
    this.form = new FormGroup({
      id: new FormControl(this.isUpdate ? data.currentObject.id : makeId()),
      reference: new FormControl(this.data.reference),
      campaign_name: new FormControl(this.isUpdate ? data.currentObject.campaign_name : ''),
      start_date: new FormControl(this.isUpdate ? data.currentObject.start_date : ''),
      end_date: new FormControl(this.isUpdate ? data.currentObject.end_date : ''),
      // agency!: new FormControl(this.isUpdate ? data.currentObject.agency : ''),
      organisation!: new FormControl(this.data.organisation)
    });
  }

  ngOnInit(): void {
  }

  onSelectionAgencyDone(event) {
    this.selectedAgency= event[0].name;
  }

  async save() {
    this.loading = true;
    const formValues = {
      ...this.form.value,
      start_date: moment(this.form.value.start_date).toISOString(),
      end_date: moment(this.form.value.end_date).toISOString(),
      agency: this.selectedAgency
    };
    let trackedEntityInstanceId = this.data.currentObject.trackedEntityInstance?this.data.currentObject.trackedEntityInstance:null;
    let eventDate;
    await this.campaignService.saveUpdateCampaign(this.isUpdate,formValues,trackedEntityInstanceId, eventDate).toPromise();
    this.loading = false;
    this.cancel();
  }

  cancel() {
    document.getElementById("closeButton")?.click();
  }



}
