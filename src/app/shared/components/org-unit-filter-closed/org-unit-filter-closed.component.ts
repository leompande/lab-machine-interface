import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tulonge-org-unit-filter-closed',
  templateUrl: './org-unit-filter-closed.component.html',
  styleUrls: ['./org-unit-filter-closed.component.scss']
})
export class OrgUnitFilterClosedComponent implements OnInit {
  showOu = false;
  @Input() startingOus: string[] = [];
  @Input() orgunit_model: any = {
    selection_mode: 'Usr_orgUnit',
    selected_levels: [],
    show_update_button: true,
    selected_groups: [],
    orgunit_levels: [],
    orgunit_groups: [],
    selected_orgunits: [],
    user_orgunits: [],
    type: 'report', // can be 'data_entry'
    selected_user_orgunit: []
  };

  // The organisation unit configuration object This will have to come from outside.
  @Input() orgunit_tree_config: any = {
    show_search: true,
    show_levels: true,
    search_text: 'Search',
    level: null,
    loading: true,
    loading_message: 'Loading Organisation units...',
    multiple: true,
    multiple_key: 'none', // can be control or shift
    placeholder: 'Select Organisation Unit'
  };

  @Output() orgUnitUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() orgUnitInit: EventEmitter<any> = new EventEmitter<any>();
  @Output() orgUnitModelUpdate: EventEmitter<any> = new EventEmitter<any>();
  name = '';
  constructor() {}

  ngOnInit() {}

  onOrgUnitUpdate(event) {
    this.orgUnitUpdate.emit(event);
    if (event && event.items && event.items.length > 0) {
      const extraLength = event.items.length - 2;
      this.name = event.items.length < 3
        ? event.items.map(item => item.name).join(', ')
        : event.items.slice(0, 2).map(item => item.name).join(', ') + ' and ' + extraLength + ' more';
    } else {
      this.name = '';
    }
    if (!this.orgunit_tree_config.multiple && this.showOu) {
      this.showOu = !this.showOu;
    }
  }

  onOrgUnitModelUpdate(event) {
    this.orgUnitModelUpdate.emit(event);
  }

  onOrgUnitInit(event) {
    this.orgUnitInit.emit(event);
  }
}
