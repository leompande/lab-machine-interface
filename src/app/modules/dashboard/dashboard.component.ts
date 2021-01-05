import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  zoom = 3;
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    maxZoom: 15,
    minZoom: 6,
  }

  markers = [
  ];

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'white',
      },
    });
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 5) * 3) / 5,
        lng: this.center.lng + ((Math.random() - 5) * 3) / 5,
      },
      label: {
        color: 'white',
      },
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
    this.addMarker();
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

}
