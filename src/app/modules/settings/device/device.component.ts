import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/shared/services/http-client.service';

interface Device {
  id: string;
  name: string;
  port: string;
  deviceType?: string;
  connector?: string;
  baudRate?: number;
  autoOpen?: boolean;
  dataBits?: number;
  lock?: boolean;
  parity?: string;
  stopBits?: number;
  xon?: boolean;
  xany?: boolean;
  rtscts?: boolean;
  lastConnectedDate?: string;
}

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
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
  constructor(
    private http: HttpClientService
    ) { }

  ngOnInit(): void {
    this.getDevices();
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

  reloadEquipments() {
    this.getDevices();
  }

}
