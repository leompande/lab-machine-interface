import { Component, OnInit, Inject } from '@angular/core';
import { fadeIn, fadeSmooth } from 'src/app/shared/animations/router-animation';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'src/app/store/campaign/reducers/campaign';
import { DatastoreService } from 'src/app/shared/services/dhis2/datastore.service';
import { SignBoardService } from 'src/app/shared/services/model-services/signboard.service';
import { SignBoard } from 'src/app/store/sign-board/reducers/sign-board';

@Component({
  selector: 'app-sign-board-more',
  templateUrl: './sign-board-more.component.html',
  styleUrls: ['./sign-board-more.component.scss'],
  animations: [fadeIn, fadeSmooth]
})
export class SignBoardMoreComponent implements OnInit {
  isUpdate: boolean;
  loading: boolean;
  form!: FormGroup;
  showTableColumns: any = {};
  base64ImageString: string = 'data:image/png;base64,';
  imageUrl: string;
  files: any = [];
  signBoard: SignBoard;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { currentObject: SignBoard, campaign: Campaign }, private dataStoreService: DatastoreService, private signBoardService: SignBoardService) {
    this.signBoard = data.currentObject;
    this.form = new FormGroup({
      actual_planting_date: new FormControl(data.currentObject.actual_planting_date),
      date_to_be_planted: new FormControl(data.currentObject.date_to_be_planted),
      latitude: new FormControl(data.currentObject.latitude),
      longitude: new FormControl(data.currentObject.longitude),
    });
  }

  ngOnInit(): void {
  }

  actionTaken(event) {
    if (event.value === 'mark_as_planted') {
      this.showTableColumns['actual_planting_date'] = true;
      this.showTableColumns['date_to_be_planted'] = true;
    }
  }

  actualDateChange(event) {
    this.showTableColumns['latitude'] = true;
    this.showTableColumns['longitude'] = true;
  }

  changeLatitude(event) {
    if (this.form.value['latitude'] && this.form.value['longitude']) {
      this.showTableColumns['take_a_photo'] = true;
    }
  }

  changeLongitude(event) {
    if (this.form.value['latitude'] && this.form.value['longitude']) {
      this.showTableColumns['take_a_photo'] = true;
    }
  }


  uploadFile(evt) {
    this.files = [];
    var files = evt;
    var file = files[0];
    this.files.push(file.name);

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
    if (this.files.length > 0) {

      this.showTableColumns['save_area'] = true;
    } else {

      this.showTableColumns['save_area'] = false;
    }
  }



  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.imageUrl = this.base64ImageString + btoa(binaryString);
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }

  async save() {
    this.loading = true;
    const data = await this.dataStoreService.saveData('images', this.data.currentObject.id, { image: this.imageUrl }).toPromise();

    const formValues = {
      ...this.data.currentObject,
      ...this.form.value,
      signboard_image: this.imageUrl
    };
    let trackedEntityInstanceId, eventDate;
    await this.signBoardService.saveUpdateSignBoard(true, formValues, this.data.currentObject.trackedEntityInstance, eventDate).toPromise();
    this.loading = false;
    this.cancel();
  }

  cancel() {
    this.closeDialog();
  }

  closeDialog() {
    document.getElementById("closeButton")?.click();
  }
}
