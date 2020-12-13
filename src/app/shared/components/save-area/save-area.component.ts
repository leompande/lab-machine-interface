import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeIn, fadeSmooth } from '../../animations/router-animation';

@Component({
  selector: 'app-save-area',
  templateUrl: './save-area.component.html',
  styleUrls: ['./save-area.component.scss'],
  animations: [fadeSmooth]
})
export class SaveAreaComponent implements OnInit {
  @Input() isUpdate: boolean = false;
  @Input() loading: boolean= false;
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  confirmButtonsVisible: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.onCancel.emit()
  }

  attempSave() {
    this.confirmButtonsVisible = true;
  }

  continue() {
    this.onSave.emit();
    this.confirmButtonsVisible = false;
  }

  stop() {
    this.confirmButtonsVisible = false;

  }
}
