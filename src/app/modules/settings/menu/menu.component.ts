import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menus: any[] = [
    {
      id: "paramter",
      name: "Paramter Configurations",
      url: "parameter-mapping",
      image:"parameter.png"
    },
    {
      id: "device",
      name: "Devices",
      url: "devices",
      image:"device.png"
    },
    {
      id: "setup",
      name: "Server Setup",
      url: "setup",
      image:"setup.png"
    }
  ]
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateMenu(menu:any){
    console.log(menu);
    this.router.navigate(['settings',menu.url]);
  }

}
