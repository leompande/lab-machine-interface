import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'tulonge-multiselect',
  templateUrl: 'multiselect.component.html',
  styleUrls: ['multiselect.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiselectComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() placeholder = 'Select';
  @Input() starting_items: any[] = [];
  @Input() selected_items: any[] = [];
  @Input() prefix = '';
  @Input() prefix_multiple = '';
  @Input() multiple = true;
  hideOptions = true;
  search_text: string;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    if (this.starting_items.length !== 0) {
      if (this.selected_items.length === 0) {
        this.selected_items = this.starting_items;
      } else {
        this.starting_items.forEach(val => {
          this.selected_items.push(val);
        });
      }
      this.selected.emit(this.selected_items);
    }
  }

  displayPerTree() {
    this.hideOptions = !this.hideOptions;
  }

  reset() {
    this.selected_items = [];
    this.selected.emit(this.selected_items);
  }

  checkItemAvailabilty(item, array): boolean {
    let checker = false;
    for (const per of array) {
      if (per.id === item.id) {
        checker = true;
      }
    }
    return checker;
  }

  selectItem(item) {
    if (this.multiple) {
      if (this.checkItemAvailabilty(item, this.selected_items)) {
        this.selected_items.splice(this.selected_items.indexOf(item), 1);
      } else {
        this.selected_items.push(item);
      }
      this.selected.emit(this.selected_items);
    } else {
      this.selected_items = [item];
      this.selected.emit(this.selected_items[0]);
      this.displayPerTree();
    }
  }

  deActivateNode(item, event) {
    this.selected_items.splice(this.selected_items.indexOf(item), 1);
    if (this.multiple) {
      this.selected.emit(this.selected_items);
    } else {
      this.selected.emit(null);
    }
    event.stopPropagation();
  }
}
