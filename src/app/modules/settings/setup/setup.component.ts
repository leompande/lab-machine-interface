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


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  animations: [fadeIn]
})
export class SetupComponent implements OnInit {
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

  constructor(
    private http: HttpClientService
    ) { }

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


  deviceChanged(event) {
    console.log(event);
  }


}
