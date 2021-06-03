import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/shared/animations/router-animation';
import { HttpClientService } from 'src/app/shared/services/http-client.service';


interface Hospital {
  id: string;
  name: string;
  region: string;
  phone: string;
  email: string;
  afyacareurl: string;
  afyacareusername: string;
  afyacarepassword: string;
}

interface Device {
  id: string;
  name: string;
  deviceType: string;
  connector: string;
  port: string;
  lastConnectedDate: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [fadeIn]
})
export class SettingsComponent implements OnInit {
  panelOpenState = true;
  id: string;
  name: string;
  region: string;
  phone: string;
  email: string;
  afyacareurl: string;
  afyacareusername: string;
  afyacarepassword: string;
  isUpdating: boolean = false;

  devices: Device[] = [];
  constructor(private http: HttpClientService) { }

  equipments: any[] = [{ id: "afqew", name: "Equipment 1", port: "COM 1", connector: "USB Connect A" }, { id: "", name: "Equipment 2", port: "COM 2", connector: "USB Connect B" }, { id: "", name: "Equipment 3", port: "COM 3", connector: "USB Connect C" }];

  ngOnInit(): void {
    this.getHospital();
  }

  saveHospital() {
    this.isUpdating = true;
    const hospital: Hospital = {
      id: this.id,
      name: this.name,
      region: this.region,
      phone: this.phone,
      email: this.email,
      afyacareurl: this.afyacareurl,
      afyacareusername: this.afyacareusername,
      afyacarepassword: this.afyacarepassword
    }
    if (hospital.id == null) {
      this.http.post('/api/hospital', hospital).subscribe((response) => {
        this.getHospital();
      });
    } else {
      this.http.put('/api/hospital/' + hospital.id, hospital).subscribe((response) => {
        this.getHospital();
      });
    }

  }

  getHospital() {
    this.http.get('/api/hospital').subscribe((response: Hospital) => {
      this.id = response.id;
      this.name = response.name;
      this.region = response.region;
      this.email = response.email;
      this.phone = response.phone;
      this.afyacareurl = response.afyacareurl;
      this.afyacareusername = response.afyacareusername;
      this.afyacarepassword = response.afyacarepassword;
      this.isUpdating = false;

    });
  }
  getDevices() {
    this.http.get('/api/devices').subscribe((response: Device[]) => {
      this.devices = response;

    });
  }

  saveDevice() {

  }

  deviceChanged(event) {
    console.log(event);
  }

}
