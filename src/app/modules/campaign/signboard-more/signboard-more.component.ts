import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'src/app/store/campaign/reducers/campaign';
import { Organisation } from 'src/app/store/organisation/reducers/organisation';
import { SignBoardService } from 'src/app/shared/services/model-services/signboard.service';
import { SignBoard } from 'src/app/store/sign-board/reducers/sign-board';
import { fadeSmooth, fadeIn } from 'src/app/shared/animations/router-animation';
import { GoogleMap } from '@angular/google-maps';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signboard-more',
  templateUrl: './signboard-more.component.html',
  styleUrls: ['./signboard-more.component.scss'],
  animations: [fadeSmooth, fadeIn]
})
export class SignboardMoreComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  zoom = 4;
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    maxZoom: 15,
    minZoom: 4,
  }

  markers = [
  ];


  signBoard: SignBoard;
  barCodeValue: string;
  campaign: Campaign;
  signBoardImage: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { signBoard: any, signBoardImage: string, campaign: Campaign, organisation: Organisation }, private signBoardService: SignBoardService) {
    this.signBoard = data.signBoard;
    this.campaign = data.campaign;
    this.signBoardImage = data.signBoardImage;

  }

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

  ngOnInit(): void {
    this.barCodeValue =
      this.signBoard.company_name +
      ', Campaign:' + this.campaign.campaign_name +
      ', District:' + this.signBoard.district_council_name +
      ', Street:' + this.signBoard.street_name +
      ', Width:' + this.signBoard.board_width +
      ', Height:' + this.signBoard.board_height;


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

  closeDialog() {
    document.getElementById("closeButton")?.click();
  }


}
