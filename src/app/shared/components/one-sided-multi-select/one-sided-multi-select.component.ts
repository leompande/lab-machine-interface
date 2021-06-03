import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { fadeIn } from '../../animations/router-animation';
export interface SelectConfig {
  label?: string;
  allowMultiple: boolean;
  autoDismiss: boolean;
}

export interface ListItem {
  id: string;
  name: string;
  value: string;
  chosed: boolean;
}

@Component({
  selector: 'app-one-sided-multi-select',
  templateUrl: './one-sided-multi-select.component.html',
  styleUrls: ['./one-sided-multi-select.component.scss'],
  animations: [fadeIn],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class OneSidedMultiSelectComponent implements OnInit {
  @Input()
  config!: SelectConfig;
  @Input()
  items!: ListItem[];
  @Input() selected: ListItem[] = [];
  showRender!: boolean;
  searchText!: string;
  @Output() onChange = new EventEmitter();

  constructor(private _eref: ElementRef) { }

  ngOnInit(): void {

  }
  onClick(event: { target: any; }) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.showRender = false;
    } // or some similar check

  }

  toggle() {
    this.showRender = !this.showRender;
  }

  filterSelected(event: any) {
    this.searchText = event.target.value;
  }

  selectItem(item: ListItem) {
    this.selected = this.selected == undefined || this.selected == null ? [] : this.selected;
    if (item.chosed == true) {
      item.chosed = false;
      this.selected = this.selected.filter((itemIn) => itemIn.id != item.id);
    } else {
      if (this.config.allowMultiple == false && this.selected && this.selected.length > 0) {
        this.items = this.items.map(itemIn => {
          itemIn.chosed = false;
          return itemIn;
        });
        item.chosed = true;
        this.selected = [
          item
        ];
        if (this.config.autoDismiss) {
          this.toggle();
        }
      } else {
        item.chosed = true;
        this.selected ?? [];
        this.selected = [
          ...this.selected,
          item
        ];


        if (this.config.autoDismiss) {
          this.toggle();
        }
      }

    }

    this.items = this.items.map(itemIn => {
      if (itemIn.id == item.id) {
        itemIn.chosed = item.chosed;
      }
      return itemIn;
    });

    this.onChange.emit(this.selected);

  }

}
