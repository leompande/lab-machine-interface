import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { makeId } from 'src/app/shared/helpers';
import { HttpClient } from '@angular/common/http';
import { AssignedBoardBatchService } from 'src/app/shared/services/model-services/assignedboardbatch.service';
import { SelectConfig, ListItem } from 'src/app/shared/components/one-sided-multi-select/one-sided-multi-select.component';
import { Campaign } from 'src/app/store/campaign/reducers/campaign';
import { SignBoardBatch } from 'src/app/store/sign-board-batch/reducers/sign-board-batch';
import { fadeIn } from 'src/app/shared/animations/router-animation';
import { Outlet } from 'src/app/store/outlet/reducers/outlet';
import { Item } from 'src/app/shared/components/two-sided-multi-select/two-sided-multi-select.component';
import { HttpClientService } from 'src/app/shared/services/dhis2/http-client.service';
import { Agency } from 'src/app/store/agency/reducers/agency';
import { SignBoardBatchService } from 'src/app/shared/services/model-services/signboardbatch.service';
import { ApplicationState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { LoadAssignedBoardBatches } from 'src/app/store/assigned-board-batches/actions/assigned-board-batch.actions';
import { OutletAssignmentService } from 'src/app/shared/services/model-services/outletassignment.service';
import { OutletAssignment } from 'src/app/store/outlet-assignment/reducers/outlet-assignment';
import { LoadOutletAssignments } from 'src/app/store/outlet-assignment/actions/outlet-assignment.actions';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-preview',
  templateUrl: './preview-assignment.component.html',
  styleUrls: ['./preview-assignment.component.scss'],
  animations: [fadeIn]
})
export class PreviewAssignmentComponent implements OnInit {
  isUpdate: boolean = false;
  form!: FormGroup;
  loading: boolean = false;

  campaings: Campaign[];
  batches: SignBoardBatch[];
  agencies: Agency[];

  selectedAgencies: Agency[] = [];
  outlets: Outlet[];
  selectedBatch: SignBoardBatch;
  selectedAgency: Agency;

  availableAgencies: ListItem[];



  availableCampaigns: ListItem[];
  availableBatches: ListItem[];

  filteredOutlets: Item[];

  campaignConfig: SelectConfig = {
    label: 'Campaign',
    allowMultiple: false,
    autoDismiss: true
  }

  batchConfig: SelectConfig = {
    label: 'Batches',
    allowMultiple: false,
    autoDismiss: true
  }

  outletsConfig: SelectConfig = {
    label: 'Outlets',
    allowMultiple: false,
    autoDismiss: true
  }

  agencyConfig: SelectConfig = {
    label: 'Agency',
    allowMultiple: false,
    autoDismiss: true
  }

  orgunit_tree_config: any = {
    show_search: true,
    show_levels: false,
    search_text: 'Search',
    level: null,
    loading: true,
    loading_message: 'Loading Organization units...',
    multiple: false,
    multiple_key: 'none', // can be control or shift
    placeholder: 'Select District Council',
    openUserOu: false
  };
  showOrgUnitSelectionError: boolean = false;
  organisation_unit_id: string;
  district_council_name: string;
  startingOus = [];

  orgUnitData: {
    districtId: string,
    district: string,
    region: string
  };
  campaignIsSelected: boolean = false;

  selectedBatches: any[];

  assignedQuantity: number = 0;

  hasAssignmentError: boolean = false;

  assignedOutlets: { outlet: string, value: string }[] = [];
  campaign_name: string;
  outletAssignemtList: any[];
  showMap: boolean = true;
  showTable: boolean = false;

  @ViewChild(GoogleMap) map!: GoogleMap;

  mapOptions: google.maps.MapOptions = {
    center: { lat: -6.369008, lng: 34.8888 },
    zoom: 6
  }
  markers = [];



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      currentObject: any,
      campaigns: Campaign[],
      batches: SignBoardBatch[],
      outlets: Outlet[],
      agencies: Agency[],
      outletsAssignments: OutletAssignment[]
    },
    private assignedBoardBatchService: AssignedBoardBatchService,
    private batchService: SignBoardBatchService,
    private http: HttpClientService,
    private store: Store<ApplicationState>,
    private outAssignmentService: OutletAssignmentService) {

    this.campaign_name = data.campaigns.find(campaing => {
      return campaing.reference === data.currentObject.campaign_reference_number
    }).campaign_name;
    this.outletAssignemtList = data.outletsAssignments.filter(assignment => {
      return assignment.batch_reference_number == data.currentObject.batch_reference_number;
    }).map(assignment => {
      if (assignment.latitude != null && assignment.longitude != null) {
        this.markers = [
          ...this.markers,
          {
            position: { lat: +assignment.latitude, lng: +assignment.longitude },
            label:data.outlets.find(outlet => outlet.id == assignment.outlet).name
          }
        ];
      }

      return {
        ...assignment,
        outlet: data.outlets.find(outlet => outlet.id == assignment.outlet)
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    this.map.fitBounds(this.getBounds(this.markers));
  }

  getBounds(markers) {
    let north;
    let south;
    let east;
    let west;

    for (const marker of markers) {
      // set the coordinates to marker's lat and lng on the first run.
      // if the coordinates exist, get max or min depends on the coordinates.
      north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
      south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
      east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
      west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
    };

    const bounds = { north, south, east, west };

    return bounds;
  }

  selectCampaignChange(event: any) {
    if (event.length > 0) {
      this.selectedBatches = [];
      this.campaignIsSelected = true;
      const selectedCampaign: Campaign = this.campaings.filter(campaign => campaign.id == event[0].id) ? this.campaings.filter(campaign => campaign.id == event[0].id)[0] : null;
      const selectedBatchItems = this.batches.filter(batch => batch.campaign_reference_number == selectedCampaign.reference);
      this.availableBatches = selectedBatchItems.map(batch => {
        return {
          id: batch.id,
          name: batch.batch_reference_number + " (" + batch.board_height + "x" + batch.board_width + ")",
          value: batch.id,
          chosed: false
        }
      });
    } else {
      this.campaignIsSelected = false;
      this.selectedBatches = [];
    }
  }

  selecteBatchChange(event: any) {
    const availableBatch = this.batches.filter((batch: any) => batch.id == event[0].id);
    const batch: SignBoardBatch = availableBatch[0];
    this.selectedBatch = batch;
    this.selectedBatches.push(batch);
    this.form.controls['board_width'].setValue(batch.board_width);
    this.form.controls['board_height'].setValue(batch.board_height);
    this.form.controls['signboard_quantity'].setValue(batch.signboard_quantity);
    this.form.controls['batch_reference_number'].setValue(batch.batch_reference_number);
    this.form.controls['campaign_reference_number'].setValue(batch.campaign_reference_number);
    // this.form.controls['assigned_quantity'].setValue(5);
  }

  selecteAgencyChange(event: any) {
    this.selectedAgency = this.agencies.find(agency => agency.id == event[0].id);
    this.form.controls['agency_name'].setValue(this.selectedAgency.name);
  }

  changeAssignedQuantity(event: any) {
    this.assignedQuantity = event.target.value;
  }

  onOutletAssigned(event: any) {
    this.assignedOutlets = event;
  }

  assignmentError(event) {
    this.hasAssignmentError = event;
  }

  viewTable() {
    this.showMap = false;
    this.showTable = true;
  }

  viewMap() {
    this.showMap = true;
    this.showTable = false;
  }

  async onOrgunitSelected(event: any) {
    const selectedOrganisationUnit = event.items[0];
    this.showOrgUnitSelectionError = false;
    if (selectedOrganisationUnit && selectedOrganisationUnit.level == 5) {
      this.showOrgUnitSelectionError = false;
      this.organisation_unit_id = selectedOrganisationUnit.id;
      this.district_council_name = selectedOrganisationUnit.name;
      const data = await this.http.get("organisationUnits/" + this.organisation_unit_id + ".json?fields=id,name,parent[id,name,parent[id,name]]").toPromise();
      try {
        this.orgUnitData = {
          districtId: data['id'],
          district: data ? data['name'] : "",
          region: data ? data['parent'] ? data['parent']['name'] : "" : "",
        };
      } catch (e) {
        console.log(e);
      }

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

  async save() {
    this.loading = true;
    const formValue = {
      ...this.form.value,
      organisation_unit_id: this.orgUnitData.districtId,
      district: this.orgUnitData.district,
      region: this.orgUnitData.region,
      start_date: this.selectedBatch.start_date,
      end_date: this.selectedBatch.end_date,
      status: 'ACTIVE'
    };
    let assignemnts: OutletAssignment[] = [];
    this.assignedOutlets.forEach(assignedOutlet => {

      assignemnts = [...assignemnts, {
        id: makeId(),
        enrollment_id: makeId(),
        organisation_unit_id: formValue.organisation_unit_id,
        trackedEntityInstance: makeId(),
        outlet: assignedOutlet.outlet,
        campaign_reference_number: formValue.campaign_reference_number,
        batch_reference_number: formValue.batch_reference_number,
        latitude: formValue.latitude,
        longitude: formValue.longitude,
        assigned_quantity: assignedOutlet.value,
        planted_quantity: '0',
        board_height: formValue.board_height,
        board_width: formValue.board_width,
        planted_date: null,
        start_date: formValue.start_date,
        end_date: formValue.end_date,
        status: "PENDING",
      }];
    });

    try {
      this.selectedBatch = {
        ...this.selectedBatch,
        assigned_quantity: this.selectedBatch.assigned_quantity != null ? (+this.selectedBatch.assigned_quantity) + formValue.assigned_quantity : formValue.assigned_quantity
      }
    } catch (e) {

    }


    const response = await this.assignedBoardBatchService.saveUpdateAssignedBoardBatch(false, { ...formValue, signboard_quantity: this.selectedBatch.assigned_quantity }, '', '').toPromise();
    if (response['httpStatus'] == 'OK') {
      try {

        const updateReponse = await this.batchService.saveUpdateSignBoardBatch(true, this.selectedBatch, this.selectedBatch.trackedEntityInstance, null).toPromise();
        const outletAssignResponse = await this.outAssignmentService.saveOutletAssignments(assignemnts).toPromise();
        console.log(updateReponse);
        console.log(outletAssignResponse);
      } catch (e) {
        console.log(e);
      }

    }
    this.store.dispatch(new LoadAssignedBoardBatches());
    this.store.dispatch(new LoadOutletAssignments());
    this.loading = false;
    this.cancel();
  }

  cancel() {
    document.getElementById("closeButton")?.click();
  }

}
