import { Component, OnInit, Input } from '@angular/core';
import { Outlet } from 'src/app/store/outlet/reducers/outlet';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OutletService } from 'src/app/shared/services/model-services/outlet.service';
import { AddEditOutletComponent } from './add-edit/add-edit.component';
import { OutletMapPreviewComponent } from './outlet-map-preview/outlet-map-preview.component';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit {

  @Input()
  outlets!: Outlet[];
  @Input() outletEntities: any;
  @Input() loading$!: Observable<boolean>;

  tableConfigurations = {
    tableColumns: [
      { name: 'name', label: 'Outlet Name' },
      { name: 'street', label: 'Street' },
      { name: 'ward', label: 'Ward' },
      { name: 'district', label: 'District' },
      { name: 'region', label: 'Region' },
      { name: 'ownership', label: 'Ownership' },
      { name: 'latitude', label: 'Latitude', type:'NUMBER' },
      { name: 'longitude', label: 'Longitude', type:'NUMBER' },
      { name: 'ownerName', label: 'Owner' },
      { name: 'phone', label: 'Phone' },
      { name: 'email', label: 'Email' },
      { name: 'box', label: 'P.O. Box' }

    ],
    tableCaption: ' ',
    tableNotifications: '',
    showBorder: true,
    allowPagination: true,
    actionIcons: { edit: true, delete: true, more: false },
    doneLoading: false,
    showSearch: true,
    showMap: true,
    deleting: {},
    empty_msg: 'No Outlets'
  };

  constructor(public dialog: MatDialog, private outletService: OutletService) { }

  ngOnInit(): void {
  }




  updateOutlet(outletId: string) {
    const dialogRef = this.dialog.open(AddEditOutletComponent, {
      data: {
        currentObject: this.outlets.find(outlet => outlet.id == outletId),
      },
      width: '80%',
      maxHeight: '80%',
      disableClose: true,
      hasBackdrop: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  mapPreview(event){
    const dialogRef = this.dialog.open(OutletMapPreviewComponent, {
      data: {
        outlets: this.outlets.map(outlet=>{
          return {id: outlet.id,name: outlet.name,latitude: outlet.latitude, longitude: outlet.longitude}
        }),
      },
      width: '80%',
      maxHeight: '80%',
      disableClose: true,
      hasBackdrop: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  async deleteOutlet(outletId: any) {
    await this.outletService.deleteOutlet(outletId).toPromise();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEditOutletComponent, {
      width: '95%',
      maxHeight: '80%',
      disableClose: true,
      hasBackdrop: true, data: {},
      closeOnNavigation: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
