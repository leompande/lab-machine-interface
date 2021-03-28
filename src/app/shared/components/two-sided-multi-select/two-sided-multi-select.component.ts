import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeIn } from '../../animations/router-animation';
export interface Item {
  id: string;
  name: string;
  value: string;
  chosed: boolean;
}
@Component({
  selector: 'app-two-sided-multi-select',
  templateUrl: './two-sided-multi-select.component.html',
  styleUrls: ['./two-sided-multi-select.component.scss'],
  animations: [fadeIn]
})
export class TwoSidedMultiSelectComponent implements OnInit {
  @Input()
  availableItems!: Item[];
  @Input()
  selectedItems: Item[] = [];
  @Input()
  label!: string;
  choosedItems: Item[] = [];
  availableFilterValue!: string;
  selectedFilterValue!: string;

  @Output() changed = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  filterSelected(event: { target: { value: string; }; }){
    this.selectedFilterValue = event.target.value;
  }

  filterAvailable(event: { target: { value: string; }; }){
    this.availableFilterValue = event.target.value;
  }

  selectItem(itemId?: string, side?: string) {
    this.selectedItems = this.selectedItems == null ? [] : this.selectedItems;
    this.availableItems = this.availableItems = null ? [] : this.availableItems;

    if (itemId) {
      if (side == 'left') {
        this.selectedItems = [
          ...this.selectedItems,
          ...this.availableItems.filter((item) => item.id == itemId).map((item) => {
            item.chosed = false;
            return item;
          })
        ];
        this.availableItems = this.availableItems.filter((item) => item.id != itemId);
      }

      if (side == 'right') {
        this.availableItems = [
          ...this.availableItems,
          ...this.selectedItems.filter((item) => item.id == itemId).map((item) => {
            item.chosed = false;
            return item;
          })
        ];
        this.selectedItems = this.selectedItems.filter((item) => item.id != itemId);
      }

    } else {
      if (side == 'left') {
        var available = this.availableItems.filter((item) => item.chosed != true);
        this.selectedItems = [
          ...this.selectedItems,
          ...this.availableItems.filter((item) => item.chosed == true).map((item) => {
            item.chosed = false;
            return item;
          })
        ];
        this.availableItems = available;
      }

      if (side == 'right') {
        var selected = this.selectedItems.filter((item) => item.chosed != true);
        this.availableItems = [
          ...this.availableItems,
          ...this.selectedItems.filter((item) => item.chosed == true).map((item) => {
            item.chosed = false;
            return item;
          })
        ];
        this.selectedItems = selected;
      }

    }

    this.changed.emit(this.selectedItems);
  }

  selectAllItems(side?: string) {
    this.selectedItems = this.selectedItems == null ? [] : this.selectedItems;
    this.availableItems = this.availableItems = null ? [] : this.availableItems;
    if (side=="left"){
      this.selectedItems = [
        ...this.selectedItems,
        ...this.availableItems
      ];
      this.availableItems = [];
    }

    if(side=="right"){
      this.availableItems = [
        ...this.availableItems,
        ...this.selectedItems
      ];
      this.selectedItems = [];
    }

    this.changed.emit(this.selectedItems);
  }

  chooseItem(itemId: string) {
    this.availableItems = this.availableItems.map((item) => {
      if (item.id == itemId) {
        item.chosed = !item.chosed;
      }
      return item;
    });

    this.selectedItems = this.selectedItems.map((item) => {
      if (item.id == itemId) {
        item.chosed = !item.chosed;
      }
      return item;
    });
  }



}
