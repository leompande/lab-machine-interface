import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OutletService } from 'src/app/shared/services/model-services/outlet.service';

@Component({
  selector: 'app-outlet-map-preview',
  templateUrl: './outlet-map-preview.component.html',
  styleUrls: ['./outlet-map-preview.component.scss']
})
export class OutletMapPreviewComponent implements OnInit {
  outlets: { id: string, name: string, latitude: number, longitude: number }[] = [];
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  zoom = 3;
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    maxZoom: 25,
    minZoom: 6,
  }

  markers = [
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { outlets: { id: string, name: string, latitude: number, longitude: number }[] }, private outletService: OutletService) {
    this.outlets = data.outlets;
    this.outlets.forEach(outlet => this.addMarker(outlet.name, outlet.latitude, outlet.longitude));
  }

  clickEvent(event: any) {
    console.log(event);
  }

  addMarker(label: string, latitude: number, longitude: number) {
    this.markers.push({
      position: {
        lat: latitude,
        lng: longitude,
      },
      label: {
        fontFamily:'nunitoBold',
        fontSize:'14',
        text:label
      }
    });
  }

  ngOnInit() {
    this.center = {
      lat: -6.3728253,
      lng: 34.8924826,
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
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
  
}
