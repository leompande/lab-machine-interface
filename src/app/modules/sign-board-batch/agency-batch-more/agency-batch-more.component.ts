import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoogleMap } from '@angular/google-maps';
import { fadeIn } from 'src/app/shared/animations/router-animation';
import { SignBoardBatchItem } from 'src/app/store/sign-board-batch-item/reducers/sign-board-batch-item';
import { SignBoardBatch } from 'src/app/store/sign-board-batch/reducers/sign-board-batch';
import { Outlet } from 'src/app/store/outlet/reducers/outlet';

@Component({
  selector: 'app-agency-batch-more',
  templateUrl: './agency-batch-more.component.html',
  styleUrls: ['./agency-batch-more.component.scss'],
  animations: [fadeIn]
})
export class AgencyBatchMoreComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  boardItems: SignBoardBatchItem[];
  batch: SignBoardBatch;
  outlets: Outlet[];
  outlet: Outlet;
  boardItem: SignBoardBatchItem;
  detailsVisible: boolean = false;

  // Map visualization fields initiation
  zoom = 3;
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    maxZoom: 20,
    minZoom: 6,
  }

  markers = [
  ];
  // end

  tableConfigurations = {
    tableColumns: [
      { name: 'bar_code', label: 'Bar Code', type: 'barcode' },
      { name: 'board_height', label: 'Board Height' },
      { name: 'board_width', label: 'Board Width' },
      { name: 'date_to_be_planted', label: 'Expected planting date' },
      { name: 'actual_planting_date', label: 'Actual Planting Date' },
      { name: 'sign_board_status', label: 'Status' },
      { name: 'street_name', label: 'Street Name' },
      { name: 'outlet', label: 'Outlet' },
      { name: 'longitude', label: 'Longitude' },
      { name: 'latitude', label: 'Latitude' }
    ],
    tableCaption: ' ',
    tableNotifications: '',
    printTitle: '',
    showBorder: true,
    allowPagination: true,
    actionIcons: { edit: false, delete: false, more: true },
    doneLoading: false,
    showSearch: true,
    deleting: {},
    empty_msg: 'No Sign Boards'
  };

  mapVisualizer: {
    expectedLatitude: number,
    expectedLongitude: number,
    actualLatitude: number,
    actualLongitude: number
  } = {
      expectedLatitude: null,
      expectedLongitude: null,
      actualLatitude: null,
      actualLongitude: null
    }
    close_batch: boolean = false;
    planted_quantity: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { boardItems: SignBoardBatchItem[], batch: SignBoardBatch, outlets: Outlet[] }) {
    this.boardItems = data.boardItems;
    this.batch = data.batch;
    this.outlets = data.outlets;
  }

  ngOnInit(): void {
  }

  save(){
    this.close_batch = true;
    console.log("Saving the form");
  }

  addMarker(marker: { latitude: number, longitude: number, iconFlag: string }) {

    this.markers.push({
      position: {
        lat: marker.latitude,
        lng: marker.longitude,
      },
      label: {
        color: 'white',
      },
      options: {
        draggable: false,
        icon: {
          scaledSize: {
            width: 40, height: 40
          },
          size: {
            width: 40, height: 40
          },
          url: '../assets/icons/' + marker.iconFlag + '.png'
        }
      }
    });
  }

  approveSignBoard(){
    console.log(this.boardItem);
  }


  previewSignBoard(rowId: string) {
    this.boardItem = this.data.boardItems.find((item: SignBoardBatchItem) => item.id == rowId);
    this.outlet = this.outlets.find((outletItem: Outlet) => outletItem.name == this.batch.outlet);
    this.mapVisualizer.expectedLatitude = this.outlet ? +this.outlet.latitude : null;
    this.mapVisualizer.expectedLongitude = this.outlet ? +this.outlet.longitude : null;
    this.mapVisualizer.actualLatitude = this.boardItem ? +this.boardItem.latitude : null;
    this.mapVisualizer.actualLongitude = this.boardItem ? +this.boardItem.longitude : null;
    if (this.mapVisualizer.expectedLatitude && this.mapVisualizer.expectedLongitude) {
      this.center = {
        lat: this.mapVisualizer.expectedLatitude,
        lng: this.mapVisualizer.expectedLongitude,
      };
      this.zoom = 20;
      this.addMarker({ latitude: this.mapVisualizer.expectedLatitude, longitude: this.mapVisualizer.expectedLongitude, iconFlag: 'expected' });
      if (this.mapVisualizer.actualLatitude && this.mapVisualizer.actualLongitude) {
        this.addMarker({ latitude: this.mapVisualizer.actualLatitude, longitude: this.mapVisualizer.actualLongitude, iconFlag: 'actual' });
      }
    }
    this.detailsVisible = true;
  }


  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  cancel() {
    document.getElementById("closeButton")?.click();
  }

  cancelForm(){
    this.close_batch = false;
  }

  back() {
    this.detailsVisible = false;
  }

}
