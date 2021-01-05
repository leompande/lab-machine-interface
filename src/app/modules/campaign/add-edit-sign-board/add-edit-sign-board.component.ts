import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ListItem } from 'src/app/shared/components/one-sided-multi-select/one-sided-multi-select.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { makeId } from 'src/app/shared/helpers';
import { Campaign } from 'src/app/store/campaign/reducers/campaign';
import { SignBoardService } from 'src/app/shared/services/model-services/signboard.service';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';

@Component({
  selector: 'app-add-edit-sign-board',
  templateUrl: './add-edit-sign-board.component.html',
  styleUrls: ['./add-edit-sign-board.component.scss']
})
export class AddEditSignBoardComponent implements OnInit {

 
  isUpdate: boolean = false;
  form!: FormGroup;
  loading: boolean = false;
  availableAgencies: ListItem[];
  selectedAgency: string;

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
showOrgUnitSelectionError: boolean= false;
organisation_unit_id: string;
district_council_name: string;
startingOus = [];
base64ImageString: string = 'data:image/png;base64,';
imageUrl: string;
files: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { currentObject: any, campaign: Campaign, organisation: Organisation }, private signBoardService: SignBoardService) {
    
    this.isUpdate = data.currentObject != null;
    this.startingOus = this.isUpdate ? [data.currentObject.organisation_unit_id]:[];
    this.imageUrl = this.isUpdate&& data.currentObject.signboard_image ? data.currentObject.signboard_image:null;
    this.files = this.isUpdate && data.currentObject.signboard_image ? [data.currentObject.signboard_image]:[];
    this.form = new FormGroup({
      id: new FormControl(this.isUpdate ? data.currentObject.id : null),
      organisation_unit_id: new FormControl(this.isUpdate ? data.currentObject.organisation_unit_id : ''),
      district_council_name: new FormControl(this.isUpdate ? data.currentObject.district_council_name : ''),
      payment_reference_number: new FormControl(this.isUpdate ? data.currentObject.payment_reference_number : ''),
      campaign_reference_number: new FormControl(this.isUpdate ? data.currentObject.campaign_reference_number : data.campaign.reference),
      board_height: new FormControl(this.isUpdate ? data.currentObject.board_height : ''),
      board_width!: new FormControl(this.isUpdate ? data.currentObject.board_width : ''),
      street_name!: new FormControl(this.isUpdate ? data.currentObject.street_name : ''),
      latitude!: new FormControl(this.isUpdate ? data.currentObject.latitude : ''),
      longitude!: new FormControl(this.isUpdate ? data.currentObject.longitude : ''),
      survey_date!: new FormControl(this.isUpdate ? data.currentObject.survey_date : ''),
      verification_date!: new FormControl(this.isUpdate ? data.currentObject.verification_date : ''),
      date_to_be_planted!: new FormControl(this.isUpdate ? data.currentObject.date_to_be_planted : ''),
      actual_planting_date!: new FormControl(this.isUpdate ? data.currentObject.actual_planting_date : ''),
      government_submission_date!: new FormControl(this.isUpdate ? data.currentObject.government_submission_date : ''),
      government_status!: new FormControl(this.isUpdate ? data.currentObject.government_status : ''),
      signboard_image!: new FormControl(this.isUpdate ? data.currentObject.signboard_image : ''),
      signboard_status!: new FormControl(this.isUpdate ? data.currentObject.signboard_status : ''),
      company_address!: new FormControl(this.isUpdate ? data.currentObject.company_address : data.organisation.address),
      company_name!: new FormControl(this.isUpdate ? data.currentObject.company_name : data.organisation.name),
      company_tin!: new FormControl(this.isUpdate ? data.currentObject.company_tin : data.organisation.tin),
      company_vrn!: new FormControl(this.isUpdate ? data.currentObject.company_vrn : data.organisation.vrn),
      company_phone!: new FormControl(this.isUpdate ? data.currentObject.company_vrn : data.organisation.phone),
      company_email!: new FormControl(this.isUpdate ? data.currentObject.company_vrn : data.organisation.email),
      description_to_agency!:new FormControl(this.isUpdate ? data.currentObject.description_to_agency : ''),
      description_to_government!:new FormControl(this.isUpdate ? data.currentObject.description_to_government : ''),
    });
  }

  ngOnInit(): void {
  }

  async onOrgunitSelected(event) {
    const selectedOrganisationUnit = event.items[0];
    this.showOrgUnitSelectionError = false;
    if (selectedOrganisationUnit && selectedOrganisationUnit.level == 5){
      this.showOrgUnitSelectionError = false;
      this.organisation_unit_id = selectedOrganisationUnit.id;
      this.district_council_name = selectedOrganisationUnit.name;
    } else if (selectedOrganisationUnit  && selectedOrganisationUnit.level != 5){
        this.showOrgUnitSelectionError = true;
    }
  }

  onSelectionAgencyDone(event) {
    this.selectedAgency= event[0].name;
  }

  async save() {
    this.loading = true;
    const formValues = {
      ...this.form.value,
      organisation_unit_id: this.organisation_unit_id,
      district_council_name: this.district_council_name,
      signboard_image: this.imageUrl
    };
    let trackedEntityInstanceId, eventDate;
    await this.signBoardService.saveUpdateSignBoard(this.isUpdate,formValues,trackedEntityInstanceId, eventDate).toPromise();
    this.loading = false;
    this.cancel();
  }

  cancel() {
    document.getElementById("closeButton")?.click();
  }



  uploadFile(evt){
    this.files = [];
    var files = evt;
    var file = files[0];
      this.files.push(file.name);

  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}



_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
   this.imageUrl = this.base64ImageString+btoa(binaryString);
  }

  deleteAttachment(index) {
    this.files.splice(index, 1)
  }



}
