import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrgUnitService } from './org-unit.service';
import {IActionMapping, TREE_ACTIONS, TreeComponent} from '@circlon/angular-tree-component';
import { HttpClientService } from '../../services/dhis2/http-client.service';

@Component({
  selector: 'tulonge-org-unit-filter',
  templateUrl: './org-unit-filter.component.html',
  styleUrls: ['./org-unit-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgUnitFilterComponent implements OnInit {
  // the object that will carry the output value you can send one from outside to config start values
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
  @Input() ou_model: BehaviorSubject<any> = new BehaviorSubject({
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
  });
  initial_usr_orgunit = [];

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
    placeholder: 'Select Organisation Unit',
    openUserOu: false
  };
  @Input() startingOus: string[] = [];
  @Input() activateUserOu: boolean = false;

  @Output() orgUnitUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() orgUnitInit: EventEmitter<any> = new EventEmitter<any>();
  @Output() orgUnitModelUpdate: EventEmitter<any> = new EventEmitter<any>();

  orgUnit: any = {};
  root_url = '../../../';
  nodes: any[] = null;
  orgunit_levels: any[] = [];
  @ViewChild('orgtree', { static: true })
  orgtree: TreeComponent;

  organisationunits: BehaviorSubject<any[]> = new BehaviorSubject([]);
  selected_orgunits: any[] = [];

  // this variable controls the visibility of of the tree
  showOrgTree = false;

  customTemplateStringOrgunitOptions: BehaviorSubject<
    any
  > = new BehaviorSubject({
    mouse: {
      dblClick: TREE_ACTIONS.TOGGLE_EXPANDED,
      click: (node, tree, $event) =>
        TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(node, tree, $event)
    }
  });

  user_orgunits_types: Array<any> = [
    { id: 'USER_ORGUNIT', name: 'User Admin Unit', shown: true },
    { id: 'USER_ORGUNIT_CHILDREN', name: 'User sub-units', shown: true },
    { id: 'USER_ORGUNIT_GRANDCHILDREN', name: 'User sub-x2-units', shown: true }
  ];

  constructor(
    private http: HttpClientService,
    private orgunitService: OrgUnitService
  ) {
    this.ou_model.next(this.orgunit_model);
    if (!this.orgunit_tree_config.hasOwnProperty('multiple_key')) {
      this.orgunit_tree_config.multiple_key = 'none';
    }
  }

  updateModelOnSelect(data) {
    if (!this.orgunit_model.show_update_button) {
      this.orgUnitUpdate.emit({ name: 'ou', value: data.id });
      this.displayOrgTree();
    }
  }

  setTreeActions() {
    if (this.orgunit_tree_config.multiple) {
      if (this.orgunit_tree_config.multiple_key === 'none') {
        const actionMapping: IActionMapping = {
          mouse: {
            dblClick: TREE_ACTIONS.TOGGLE_EXPANDED,
            click: (node, tree, $event) =>
              TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(node, tree, $event)
          }
        };
        this.customTemplateStringOrgunitOptions.next({ actionMapping });
      } else if (this.orgunit_tree_config.multiple_key === 'control') {
        const actionMapping: IActionMapping = {
          mouse: {
            click: (node, tree, $event) => {
              $event.ctrlKey
                ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(node, tree, $event)
                : TREE_ACTIONS.TOGGLE_ACTIVE(node, tree, $event);
            }
          }
        };
        this.customTemplateStringOrgunitOptions.next({ actionMapping });
      } else if (this.orgunit_tree_config.multiple_key === 'shift') {
        const actionMapping: IActionMapping = {
          mouse: {
            click: (node, tree, $event) => {
              $event.shiftKey
                ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(node, tree, $event)
                : TREE_ACTIONS.TOGGLE_ACTIVE(node, tree, $event);
            }
          }
        };
        this.customTemplateStringOrgunitOptions.next({ actionMapping });
      }
    } else {
      const actionMapping: IActionMapping = {
        mouse: {
          dblClick: TREE_ACTIONS.TOGGLE_EXPANDED,
          click: (node, tree, $event) =>
            TREE_ACTIONS.TOGGLE_ACTIVE(node, tree, $event)
        }
      };
      this.customTemplateStringOrgunitOptions.next({ actionMapping });
    }
  }

  async initializeOrganisationUnits() {
    try {
      const ouLevelRequest = await this.orgunitService
        .getOrgunitLevelsInformation()
        .toPromise();
      this.orgunit_model.orgunit_levels = ouLevelRequest.organisationUnitLevels;
      this.orgunit_model.orgunit_groups = await this.orgunitService
        .getOrgunitGroups()
        .toPromise();
      const userOrgunit = await this.orgunitService
        .getUserInformation(this.orgunit_model.type)
        .toPromise();
      const level = this.orgunitService.getUserHighestOrgUnitlevel(userOrgunit);
      this.orgunit_model.user_orgunits = this.orgunitService.getUserOrgUnits(
        userOrgunit
      );
      this.orgunitService.user_orgunits = this.orgunitService.getUserOrgUnits(
        userOrgunit
      );
      if (this.orgunit_model.selection_mode === 'Usr_orgUnit') {
        this.orgunit_model.selected_orgunits = this.orgunit_model.user_orgunits;
      }
      const all_levels = ouLevelRequest.pager.total;
      const orgunits = this.orgunitService.getuserOrganisationUnitsWithHighestlevel(
        level,
        userOrgunit
      );
      const use_level = parseInt(all_levels, 10) - (parseInt(level, 10) - 1);
      this.ou_model.next({ ...this.orgunit_model });
      // const initial_data = await this.orgunitService.getInitialOrgunitsForTree(orgunits).toPromise();
      // this.organisationunits.next(initial_data);
      // a hack to make sure the user orgunit is not triggered on the first time
      this.initial_usr_orgunit = [
        { id: 'USER_ORGUNIT', name: 'User org unit' }
      ];
      // after done loading initial organisation units now load all organisation units
      const fields = this.orgunitService.generateUrlBasedOnLevels(use_level);
      const items = await this.orgunitService
        .getAllOrgunitsForTree1(fields, orgunits)
        .toPromise();
      this.orgunit_tree_config.loading = false;
      if (items[0]) {
        items[0].expanded = true;
      }
      this.prepareOrganisationUnitTree(items, 'parent');
      this.organisationunits.next(items);
      if (this.startingOus && this.startingOus.length > 0) {
        for (const active_orgunit of this.orgunit_model.selected_orgunits) {
          this.activateNode(active_orgunit.id, this.orgtree, true);
          if (!this.orgunit_tree_config.openUserOu) {
            this.deActivateNode(active_orgunit.id, this.orgtree, null, false);
          }
        }
        for (const active_orgunit of this.startingOus) {
          this.activateNode(active_orgunit, this.orgtree, true);
        }
      } else {
        for (const active_orgunit of this.orgunit_model.selected_orgunits) {
          this.activateNode(active_orgunit.id, this.orgtree, true);
          if (!this.orgunit_tree_config.openUserOu) {
            this.deActivateNode(active_orgunit.id, this.orgtree, null, false);
          }
        }
      }
    } catch (e) {
      this.orgunit_tree_config.loading = false;
    }
  }

  ngOnInit() {
    this.setTreeActions();
    // if (this.orgunitService.nodes === null) {
    this.initializeOrganisationUnits();
  }

  clearAll() {
    for (const active_orgunit of this.orgunit_model.selected_orgunits) {
      this.deActivateNode(active_orgunit.id, this.orgtree, null);
    }
  }

  setType(type: string) {
    this.orgunit_model.selection_mode = type;
    if (type !== 'orgUnit') {
      this.orgunit_model.selected_user_orgunit = [];
    }
    if (type !== 'Level') {
      this.orgunit_model.selected_levels = [];
    }
    if (type !== 'Group') {
      this.orgunit_model.selected_groups = [];
    }
  }

  // display Orgunit Tree
  displayOrgTree() {
    // this.showOrgTree = !this.showOrgTree;
  }

  filterNodes(value, tree) {
    tree.treeModel.filterNodes(node => {
      return !node.data.name.startsWith(value);
    });
  }

  activateNode(nodeId: any, nodes, first) {
    setTimeout(() => {
      const node = nodes.treeModel.getNodeById(nodeId);
      if (node) {
        node.setIsActive(true, true);
      }
      if (first && node) {
        node.toggleExpanded();
      }
    }, 0);
  }

  // a method to activate the model
  deActivateNode(nodeId: any, nodes, event, multiple = true) {
    setTimeout(() => {
      const node = nodes.treeModel.getNodeById(nodeId);
      if (node) {
        node.setIsActive(false, multiple);
      }
    }, 0);
    if (event !== null) {
      event.stopPropagation();
    }
  }

  // check if orgunit already exist in the orgunit display list
  checkOrgunitAvailabilty(orgunit, array): boolean {
    let checker = false;
    array.forEach(value => {
      if (value.id === orgunit.id) {
        checker = true;
      }
    });
    return checker;
  }

  // action to be called when a tree item is deselected(Remove item in array of selected items
  deactivateOrg($event) {
    if (this.orgunit_model.selection_mode === 'Usr_orgUnit') {
      this.orgunit_model.selection_mode = 'orgUnit';
    }
    this.orgunit_model.selected_orgunits.forEach((item, index) => {
      if ($event.node.data.id === item.id) {
        this.orgunit_model.selected_orgunits.splice(index, 1);
      }
    });

    this.emit();

    // $event.node.isFocused = false;
  }

  // add item to array of selected items when item is selected
  activateOrg = $event => {
    if (this.orgunit_model.selection_mode === 'Usr_orgUnit') {
      this.orgunit_model.selection_mode = 'orgUnit';
    }
    this.selected_orgunits = [$event.node.data];
    if (
      !this.checkOrgunitAvailabilty(
        $event.node.data,
        this.orgunit_model.selected_orgunits
      )
    ) {
      this.orgunit_model.selected_orgunits.push($event.node.data);
    }
    this.orgUnit = $event.node.data;
    this.emit();
  }

  activateOrgById(ouId, nodes) {
    // const node = nodes.treeModel.getNodeById(ouId);
    // if (node) {
    //   this.selected_orgunits = [node.data];
    //   node.setIsActive(true, true);
    //   this.orgunit_model.selected_orgunits = this.selected_orgunits;
    //   this.orgUnit = node.data;
    //   this.emit();
    // }
  }

  emit() {
    this.orgUnitUpdate.emit({
      starting_name: this.getProperPreOrgunitName(),
      items: this.orgunit_model.selected_orgunits,
      name: 'ou',
      value: this.getOrgUnitsForAnalytics(this.orgunit_model, false)
    });
    this.orgUnitModelUpdate.emit(this.orgunit_model);
  }

  // set selected groups
  setSelectedGroups(selected_groups) {
    this.orgunit_model.selected_groups = selected_groups;
    this.orgUnitModelUpdate.emit(this.orgunit_model);
  }

  // set selected groups
  setSelectedUserOrg(selected_user_orgunit) {
    this.orgunit_model.selected_user_orgunit = selected_user_orgunit;
    this.emit();
  }

  // set selected groups
  setSelectedLevels(selected_levels) {
    this.orgunit_model.selected_levels = selected_levels;
    this.emit();
  }

  prepareOrganisationUnitTree(organisationUnit, type: string = 'top') {
    if (type === 'top') {
      if (organisationUnit.children) {
        organisationUnit.children.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        organisationUnit.children.forEach(child => {
          this.prepareOrganisationUnitTree(child, 'top');
        });
      }
    } else {
      organisationUnit.forEach(orgunit => {
        if (orgunit.children) {
          orgunit.children.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
          orgunit.children.forEach(child => {
            this.prepareOrganisationUnitTree(child, 'top');
          });
        }
      });
    }
  }

  updateOrgUnitModel() {
    this.displayOrgTree();
    this.emit();
  }

  // prepare a proper name for updating the organisation unit display area.
  getProperPreOrgunitName(): string {
    let name = '';
    if (this.orgunit_model.selection_mode === 'Group') {
      name =
        this.orgunit_model.selected_groups.length === 0
          ? ''
          : this.orgunit_model.selected_groups
              .map(group => group.name)
              .join(', ') + ' in';
    } else if (this.orgunit_model.selected_user_orgunit.length !== 0) {
      name =
        this.orgunit_model.selected_user_orgunit.length === 0
          ? ''
          : this.orgunit_model.selected_user_orgunit
              .map(level => level.name)
              .join(', ');
    } else if (this.orgunit_model.selection_mode === 'Level') {
      name =
        this.orgunit_model.selected_levels.length === 0
          ? ''
          : this.orgunit_model.selected_levels
              .map(level => level.name)
              .join(', ') + ' in';
    } else {
      name = '';
    }
    return name;
  }

  // get user organisationunit name
  getOrgUnitName(id) {
    const orgunit = this.orgtree.treeModel.getNodeById(id);
    return orgunit.name;
  }

  // a function to prepare a list of organisation units for analytics
  getOrgUnitsForAnalytics(orgunit_model: any, with_children: boolean): string {
    const orgUnits = [];
    let organisation_unit_analytics_string = '';
    // if the selected orgunit is user org unit
    if (orgunit_model.selected_user_orgunit.length !== 0) {
      // if(orgunit_model.user_orgunits.length === 1){
      //   let user_orgunit = this.orgtree.treeModel.getNodeById(orgunit_model.user_orgunits[0].id);
      //   orgUnits.push(user_orgunit.id);
      //   if(user_orgunit.hasOwnProperty('children') && with_children){
      //     for( let orgunit of user_orgunit.children ){
      //       orgUnits.push(orgunit.id);
      //     }
      //   }
      // }else{
      orgunit_model.selected_user_orgunit.forEach(orgunit => {
        organisation_unit_analytics_string += orgunit.id + ';';
      });

      // }
    } else {
      // if there is only one organisation unit selected
      if (orgunit_model.selected_orgunits.length === 1) {
        const detailed_orgunit = this.orgtree.treeModel.getNodeById(
          orgunit_model.selected_orgunits[0].id
        );
        orgUnits.push(detailed_orgunit.id);
        if (detailed_orgunit.hasOwnProperty('children') && with_children) {
          for (const orgunit of detailed_orgunit.children) {
            orgUnits.push(orgunit.id);
          }
        }
      } else {
        orgunit_model.selected_orgunits.forEach(orgunit => {
          orgUnits.push(orgunit.id);
        });
      }
      if (orgunit_model.selection_mode === 'orgUnit') {
      }
      if (orgunit_model.selection_mode === 'Level') {
        orgunit_model.selected_levels.forEach(level => {
          organisation_unit_analytics_string += 'LEVEL-' + level.level + ';';
        });
      }
      if (orgunit_model.selection_mode === 'Group') {
        orgunit_model.selected_groups.forEach(group => {
          organisation_unit_analytics_string += 'OU_GROUP-' + group.id + ';';
        });
      }
    }
    return organisation_unit_analytics_string + orgUnits.join(';');
  }
}
