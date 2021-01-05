import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import { HttpClientService } from '../../services/dhis2/http-client.service';
import { UserService } from '../../services/dhis2/user.service';
import { OrganizationUnit } from 'src/app/store/organization-unit/organization-unit.model';

@Injectable({
  providedIn: 'root'
})
export class OrgUnitService {
  nodes: any[] = null;
  orgunit_levels: any[] = [];
  user_orgunits: any[] = [];
  orgunit_groups: any[] = [];
  initial_orgunits: any[] = [];

  constructor(
    private http: HttpClientService,
    private userService: UserService,
  ) {
  }

  // Get current user information
  getUserInformation(priority = null) {
    return this.userService.getCurrentUser();
  }

  getuserOrganisationUnitsWithHighestlevel(level, userOrgunits) {
    const orgunits = [];
    if (!userOrgunits.hasOwnProperty('dataViewOrganisationUnits')) {
      userOrgunits.organisationUnits.forEach(orgunit => {
        if (orgunit?.level === level) {
          orgunits.push(orgunit.id);
        }
      });
    } else {
      if (userOrgunits.dataViewOrganisationUnits.length === 0) {
        userOrgunits.organisationUnits.forEach(orgunit => {
          if (orgunit?.level === level) {
            orgunits.push(orgunit.id);
          }
        });
      } else {
        level = userOrgunits.dataViewOrganisationUnits[0].level;
        userOrgunits.dataViewOrganisationUnits.forEach(orgunit => {
          if (orgunit?.level === level) {
            orgunits.push(orgunit.id);
          }
        });
      }
    }
    return orgunits;
  }

  /**
   * get the highest level among organisation units that user belongs to
   * @param userOrgunits
   * @returns {any}
   */
  getUserHighestOrgUnitlevel(userOrgunits) {
    let level: any;
    const orgunits = [];
    if (!userOrgunits.hasOwnProperty('dataViewOrganisationUnits')) {
      level = userOrgunits.organisationUnits[0].level;
      userOrgunits.organisationUnits.forEach(orgunit => {
        if (orgunit?.level <= level) {
          level = orgunit.level;
        }
      });
    } else {
      if (userOrgunits.dataViewOrganisationUnits.length === 0) {
        level = userOrgunits.organisationUnits[0]?.level;
        userOrgunits.organisationUnits.forEach(orgunit => {
          if (orgunit?.level <= level) {
            level = orgunit.level;
          }
        });
      } else {
        level = userOrgunits.dataViewOrganisationUnits[0].level;
        userOrgunits.dataViewOrganisationUnits.forEach(orgunit => {
          if (orgunit?.level <= level) {
            level = orgunit.level;
          }
        });
      }
    }
    return level;
  }

  /**
   * get the list of user orgunits as an array
   * @param userOrgunits
   * @returns {any}
   */
  getUserOrgUnits(userOrgunits) {
    const orgunits = [];
    if (!userOrgunits.hasOwnProperty('dataViewOrganisationUnits')) {
      userOrgunits.organisationUnits.forEach(orgunit => {
        orgunits.push(orgunit);
      });
    } else {
      if (userOrgunits.dataViewOrganisationUnits.length === 0) {
        userOrgunits.organisationUnits.forEach(orgunit => {
          orgunits.push(orgunit);
        });
      } else {
        userOrgunits.dataViewOrganisationUnits.forEach(orgunit => {
          orgunits.push(orgunit);
        });
      }
    }
    return orgunits;
  }

  prepareOrgunits(priority = null) {
    this.getOrgunitLevelsInformation().subscribe((data: any) => {
      this.orgunit_levels = data.organisationUnitLevels;
      this.getUserInformation(priority).subscribe(userOrgunit => {
        this.user_orgunits = this.getUserOrgUnits(userOrgunit);
        const level = this.getUserHighestOrgUnitlevel(userOrgunit);
        const all_levels = data.pager.total;
        const orgunits = this.getuserOrganisationUnitsWithHighestlevel(
          level,
          userOrgunit
        );
        const use_level = parseInt(all_levels, 10) - (parseInt(level, 10) - 1);
        const fields = this.generateUrlBasedOnLevels(use_level);
        this.getAllOrgunitsForTree1(fields, orgunits).subscribe(items => {
          //noinspection TypeScriptUnresolvedVariable
          this.nodes = items.organisationUnits;
        });
      });
    });
    this.getOrgunitGroups().subscribe(groups => {
      //noinspection TypeScriptUnresolvedVariable
      this.orgunit_groups = groups.organisationUnitGroups;
    });
  }

  // Generate Organisation unit url based on the level needed
  generateUrlBasedOnLevels(level) {
    let childrenLevels = '[]';
    for (let i = 1; i < level + 1; i++) {
      childrenLevels = childrenLevels.replace(
        '[]',
        '[id,name,level,path,children[]]'
      );
    }
    let new_string = childrenLevels.substring(1);
    new_string = new_string.replace(',children[]]', '');
    return new_string;
  }

  // Get system wide settings
  getOrgunitLevelsInformation() {
    return Observable.create(observer => {
      this.http
        .get(
          'organisationUnitLevels.json?fields=id,name,level&order=level:asc'
        )
        .subscribe(
          (levels: any) => {
            observer.next(levels);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          }
        );
    });
  }

  // Get organisation unit groups information
  getOrgunitGroups() {
    return Observable.create(observer => {
      if (this.orgunit_groups.length !== 0) {
        observer.next(this.orgunit_groups);
        observer.complete();
      } else {
        this.http
          .get(
            'organisationUnitGroups.json?fields=id,name&paging=false'
          )
          .subscribe(
            (groups: any) => {
              this.orgunit_groups = groups.organisationUnitGroups;
              observer.next(this.orgunit_groups);
              observer.complete();
            },
            error => {
              observer.error('some error occur');
            }
          );
      }
    });
  }

  // Get system wide settings
  getAllOrgunitsForTree(fields) {
    return this.http.get(
      'organisationUnits.json?filter=level:eq:1&paging=false&fields=' + fields
    );
  }

  // Get orgunit for specific
  getAllOrgunitsForTree1(fields = null, orgunits = null) {
    return Observable.create(observer => {
      if (this.nodes !== null) {
        observer.next(this.nodes);
        observer.complete();
      } else {
        this.http.get('organisationUnits.json?fields=' + fields + '&filter=id:in:[' + orgunits.join(',') + ']&paging=false')
          .subscribe((nodes: any) => {
            this.nodes = nodes.organisationUnits;
            observer.next(this.nodes);
            observer.complete();
          }, error => {
            observer.error('some error occured');
          });
      }
    });
  }

  traverseTree(nodes, orgUnits) {
    nodes.forEach(node => {
      node.children = [];
      orgUnits.forEach(orgUnit => {
        if (orgUnit.parent && orgUnit.parent.id === node.id) {
          node.children.push(orgUnit);
        }
      });
      this.traverseTree(node.children, orgUnits);
    });
  }

  getOrganisationUnits(): Observable<OrganizationUnit[]> {
    return Observable.create(observer => {
      this.http
        .get(
          `organisationUnits.json?paging=false&fields=id,name,path,level,children[id,name],parent[id,name]`
        )
        .subscribe(
          (levels: any) => {
            observer.next(levels.organisationUnits);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          }
        );
    });
  }

  // Handling error
  handleError(error: any) {
    return Observable.throw(error);
  }
}
