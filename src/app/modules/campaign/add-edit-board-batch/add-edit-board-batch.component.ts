import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ListItem } from 'src/app/shared/components/one-sided-multi-select/one-sided-multi-select.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'src/app/store/campaign/reducers/campaign';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { SignBoardBatchService } from 'src/app/shared/services/model-services/signboardbatch.service';
import { makeId } from 'src/app/shared/helpers';
import { Outlet } from 'src/app/store/outlet/reducers/outlet';

@Component({
  selector: 'app-add-edit-board-batch',
  templateUrl: './add-edit-board-batch.component.html',
  styleUrls: ['./add-edit-board-batch.component.scss']
})
export class AddEditBoardBatchComponent implements OnInit {
  isUpdate: boolean = false;
  form!: FormGroup;
  loading: boolean = false;
  availableAgencies: ListItem[];
  availableOutlets: ListItem[];
  filteredOutlets: ListItem[];
  selectedAgency: string;
  selectedOutlet: string;

  orgunit_tree_config: any = {
    show_search: true,
    show_levels: false,
    search_text: 'Search',
    level: null,
    loading: true,
    loading_message: 'Loading Organization units...',
    multiple: false,
    multiple_key: 'none', // can be control or shift
    placeholder: 'Select District Council Unit',
    openUserOu: false
  };
  showOrgUnitSelectionError: boolean = false;
  organisation_unit_id: string;
  district_council_name: string;
  startingOus = [];
  base64ImageString: string = 'data:image/png;base64,';
  imageUrl: string;
  files: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { currentObject: any, campaign: Campaign, organisation: Organisation, agencies: Agency[], outlets: Outlet[], reference: string }, private signBoardBatchService: SignBoardBatchService) {
    this.isUpdate = data.currentObject != null;
    this.startingOus = this.isUpdate ? [data.currentObject.organisation_unit_id] : [];
    this.availableAgencies = data.agencies.map(agency => {
      return {
        id: agency.id,
        name: agency.name,
        value: agency.name,
        chosed: false
      }
    });
    this.availableOutlets = data.outlets.map(outlet => {
      return {
        id: outlet.id,
        name: outlet.name,
        value: outlet.name,
        chosed: false
      }
    });
    this.form = new FormGroup({
      id: new FormControl(this.isUpdate ? data.currentObject.id : makeId()),
      batch_reference_number: new FormControl(this.isUpdate ? data.currentObject.batch_reference_number : data.reference),
      campaign_reference_number: new FormControl(this.isUpdate ? data.currentObject.campaign_reference_number : data.campaign.reference),
      board_height: new FormControl(this.isUpdate ? data.currentObject.board_height : ''),
      board_width!: new FormControl(this.isUpdate ? data.currentObject.board_width : ''),
      signboard_quantity!: new FormControl(this.isUpdate ? data.currentObject.signboard_quantity : ''),
      district_council_name!: new FormControl(this.isUpdate ? data.currentObject.district_council_name : ''),
      outlet!: new FormControl(this.isUpdate ? data.currentObject.outlet : ''),
      agency_name!: new FormControl(this.isUpdate ? data.currentObject.agency_name : ''),
      start_date!: new FormControl(this.isUpdate ? data.currentObject.start_date : ''),
      end_date!: new FormControl(this.isUpdate ? data.currentObject.end_date : '')
    });
  }

  ngOnInit(): void {
  }



  async onOrgunitSelected(event) {
    const selectedOrganisationUnit = event.items[0];
    this.showOrgUnitSelectionError = false;
    if (selectedOrganisationUnit && selectedOrganisationUnit.level == 5) {
      this.showOrgUnitSelectionError = false;
      this.organisation_unit_id = selectedOrganisationUnit.id;
      this.district_council_name = selectedOrganisationUnit.name;

      // filter outlets according to selected district name
      this.filteredOutlets = this.data.outlets.filter((outlet: Outlet) => {
        return outlet.district == this.district_council_name;
      }).map(outlet => {
        return {
          id: outlet.id,
          name: outlet.name,
          value: outlet.name,
          chosed: false
        }
      });
    } else if (selectedOrganisationUnit && selectedOrganisationUnit.level != 5) {
      this.showOrgUnitSelectionError = true;
    }
  }

  onSelectionAgencyDone(event) {
    this.selectedAgency = event[0].name;
  }

  onSelectionOutletDone(event) {
    this.selectedOutlet = event[0].name;
  }
  async save() {
    this.loading = true;
    const formValues = {
      ...this.form.value,
      outlet: this.selectedOutlet,
      start_date: this.form.value.start_date ? new Date(this.form.value.start_date).toISOString().substr(0, 10) : new Date().toISOString().substr(0, 10),
      end_date: this.form.value.end_date ? new Date(this.form.value.end_date).toISOString().substr(0, 10) : new Date().toISOString().substr(0, 10),
      organisation_unit_id: this.organisation_unit_id,
      district_council_name: this.district_council_name,
      agency_name: this.selectedAgency,
    };
    let trackedEntityInstanceId = this.data.currentObject && this.data.currentObject.trackedEntityInstance ? this.data.currentObject.trackedEntityInstance : makeId();
    let eventDate;
    await this.signBoardBatchService.saveUpdateSignBoardBatch(this.isUpdate, formValues, trackedEntityInstanceId, eventDate).toPromise();
    this.loading = false;
    this.cancel();
  }

  cancel() {
    document.getElementById("closeButton")?.click();
  }



  uploadFile(evt) {
    this.files = [];
    var files = evt;
    var file = files[0];
    this.files.push(file.name);

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }



  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.imageUrl = this.base64ImageString + btoa(binaryString);
  }

  deleteAttachment(index) {
    this.files.splice(index, 1)
  }



}
