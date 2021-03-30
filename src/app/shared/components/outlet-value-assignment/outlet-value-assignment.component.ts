import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Outlet } from 'src/app/store/outlet/reducers/outlet';
import { fadeIn } from '../../animations/router-animation';
export interface OutletValue {
  outlet: string;
  value: number;
}
@Component({
  selector: 'app-outlet-value-assignment',
  templateUrl: './outlet-value-assignment.component.html',
  styleUrls: ['./outlet-value-assignment.component.scss'],
  animations: [fadeIn]
})
export class OutletValueAssignmentComponent implements OnInit {
  @Output() selectedOutlet: EventEmitter<any> = new EventEmitter();
  @Output() hasError: EventEmitter<boolean> = new EventEmitter();
  @Input() outlets: Outlet[];
  @Input() assignedQuantity: number;
  outletValues: OutletValue[] = [];
  error: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  updateOutletValue(outlet, event) {
    console.log(outlet.id, event.target.value);
    this.error = {};
    if (event.target.value.length > 0) {
      this.outletValues = [
        ...this.outletValues.filter(outletValue=>outletValue.outlet!=outlet.id),
        {
          outlet: outlet.id,
          value: event.target.value
        }
      ];
    };

    const totalValue = this.outletValues.reduce((a, b) => a + (+b.value), 0);
    console.log(this.outletValues);
    if (totalValue > this.assignedQuantity) {
      this.error[outlet.id] = true;
      this.hasError.emit(true);
    } else {
      this.error[outlet.id] = false;
      this.hasError.emit(false);
      this.selectedOutlet.emit(this.outletValues);
    }
  }

}
