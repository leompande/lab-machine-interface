import { Injectable } from '@angular/core';
import { User } from 'src/app/store/user/reducers/user';
import { UserRole } from 'src/app/store/user-role/reducers/user-role';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import { DoneLoagingUsers, UpsertUser, LoadUsers } from 'src/app/store/user/actions/user.actions';
import { UpsertUserRole, DoneLoagingUserRoles } from 'src/app/store/user-role/actions/user-role.actions';
import { Tables } from '../../tables.database';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, forkJoin } from 'rxjs';
import { HttpClientService } from '../dhis2/http-client.service';
import { ManifestService } from '../dhis2/manifest.service';
import { first } from 'rxjs/operators';
import { DataService } from '../firebase/data.service';
import { makeId } from '../../helpers';
import { DatastoreService } from '../dhis2/datastore.service';

let authenticationtoken: string;
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const token = localStorage.getItem('sb-web-token');
    if (token) {
      // Pass the cloned request instead of the original request to the next handle
      return next.handle(req.clone({ headers: req.headers.set('Authorization', 'Basic ' + token) }));
    }
    const clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'Basic ' + authenticationtoken) });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}

@Injectable({ providedIn: 'root' })
export class UserService {
  userGroups: unknown;
  user$: any;

  _users: User[] = [];
  _userRoles: UserRole[] = [];

  subject: BehaviorSubject<any> = new BehaviorSubject({ isLogedIn: false, userData: null });
  datastorePath = 'users';


  constructor(
    private httpClient: HttpClientService,
    private http: HttpClient,
    private manifestService: ManifestService,
    private dataService: DataService,
    private dataStoreService: DatastoreService,
    private store: Store<ApplicationState>
  ) {
    this.setUser();
    localStorage.getItem('sb-web-token') != null ? this.subject.next({ isLogedIn: true, userData: null }) : this.subject.next({ isLogedIn: false, userData: null });
  }

  setUser() {
  }

  /**
   * Load current user information
   * @returns {Observable<User>}
   */
  loadCurrentUser(): Observable<User> {
    return new Observable(observer => {
      this.httpClient
        .get(`me.json?fields=id,name,displayName,created,lastUpdated,email,dataViewOrganisationUnits[id,name,code,level,parent[id,name]],organisationUnits[id,name,level,code,parent[id,name]],userCredentials[username,userRoles[authorities]]`)
        .subscribe(user => {
          observer.next(user);
          observer.complete();
        }, error1 => observer.error());
    });
  }

  login(credentials: { username: any, password: any }): Observable<string> {
    const meUrl = 'me.json?fields=id,name,displayName,created,lastUpdated,email,dataViewOrganisationUnits[id,name,level,code,parent[id,name]],organisationUnits[id,code,name,level,parent[id,name]],userCredentials[username,userRoles[authorities]]';
    return new Observable(observer => {
      const token = this.prepareToken(credentials);
      authenticationtoken = token;
      this.removeLocalStorageItem('sb-web-token');
      const headers: HttpHeaders = this.createDHISAuthorizationHeader(token);
      this.manifestService.getRootUrl().
        subscribe(rootUrl => {
          this.http.get(rootUrl + meUrl, {
            headers: headers
          })
            .subscribe((data: any) => {
              localStorage.setItem('sb-web-token', token);
              this.dataStoreService.getData('users', data.id).subscribe(userStoreData => {
                localStorage.setItem('sb-user', JSON.stringify(userStoreData));
                localStorage.setItem('sb-user-id', data.id);
                localStorage.setItem('sb-user-organisation-unit', this.getUserOu(data));
                this.subject.next({ isLogedIn: true, userData: data });
                observer.next('Login successful..');
                observer.complete();
              });
              
            },
              error1 => {
                const errorMessage = error1.message;
                if (errorMessage.indexOf('Unauthorized')) {
                  observer.error('Incorrect Username or Password');
                } else if (errorMessage.indexOf('unknown url')) {
                  observer.error('There is no internet connection');
                } else {
                  observer.error('There is problem with server please contact the administrator');
                }
                this.subject.next({ isLogedIn: false, userData: null });
              }
            );
        });
    });
  }

  logout() {
    localStorage.removeItem('sb-web-token');
    localStorage.removeItem('sb-user-id');
    localStorage.removeItem('sb-user-organisation-unit');
    localStorage.removeItem('currentRoute');
    localStorage.removeItem('sb-user');
    this.subject.next({ isLogedIn: false, userData: null })
  }


  removeLocalStorageItem(key: string) {
    localStorage.removeItem(`${key}`);
  }

  prepareToken(credentials: { username: any, password: any }) {
    const username = credentials.username;
    const password = credentials.password;
    const token = btoa(username + ':' + password);
    return token;
  }


  getDHIS(url: any) {

  }

  createDHISAuthorizationHeader(token: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + token });
    return headers;
  }

  getUserGroups() {
    return new Observable(observable => {
      if (this.userGroups) {
        observable.next(this.userGroups);
        observable.complete();
      } else {
        this.httpClient.get('userGroups').subscribe(
          (results: any) => {
            this.userGroups = results.userGroups;
            observable.next(this.userGroups);
            observable.complete();
          },
          error => {
            observable.error(error.json());
            observable.complete();
          }
        );
      }
    });
  }
  getCurrentUser() {

    return this.loadCurrentUser().pipe(first());
  }

  getUserOu(userData: any) {
    let userOu = null;
    if (userData != null && userData.organisationUnits && userData.organisationUnits.length !== 0) {
      userOu = userData.organisationUnits[0].id;
    } else if (userData && userData.dataViewOrganisationUnits && userData.dataViewOrganisationUnits.length !== 0) {
      userOu = userData.dataViewOrganisationUnits[0].id;
    }
    return userOu;
  }

  getUsers() {
    this.dataService.getItems(
      this._users,
      Tables.Users,
      new DoneLoagingUsers(),
      (item: User) => {
        this.store.dispatch(new UpsertUser({ User: item }));
      });
  }

  getUser(email: string) {
    return this.dataService.getOne(
      [{ left: 'email', operator: '==', right: email }],
      Tables.Users,
      new DoneLoagingUsers(),
      (item: User) => {
        this.store.dispatch(new UpsertUser({ User: item }));
      });
  }

  getRoles() {
    this.dataService.getItems(
      this._userRoles,
      Tables.UserRoles,
      new DoneLoagingUserRoles(),
      (item: UserRole) => {
        this.store.dispatch(new UpsertUserRole({ UserRole: item }));
      });
  }

  listUsers(): Observable<User[]> {
    return Observable.create((observer: any) => {
      this.httpClient.get('users.json?fields=id,firstName,surname,email,phone,userCredentials[id,username,userRoles[id,name]],organisationUnits[id,name],dataViewOrganisationUnits[id,name]&paging=false').subscribe((results) => {
        forkJoin(results.users.map((user: any) => this.dataStoreService.getData(this.datastorePath, user.id))).subscribe((output) => {
          let users: any[] = [];
          output.forEach((oUser: any) => {
            const serverUser = results.users.find((user: any) => user.id == oUser.id);
            if (serverUser) {
              users = [
                ...users,
                {
                  ...oUser,
                  email: serverUser.email,
                  phone: oUser.phone,
                  username: serverUser.userCredentials.username,
                  dhisCredentialsId: serverUser.userCredentials.id,
                  dhisOrganisationUnitId: serverUser.organisationUnits[0].id,
                  dhisRoleId: serverUser.userCredentials.userRoles[0].id
                }
              ]
            }
          })
          observer.next(users);
          observer.complete();
        });

      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  saveUser(user: User): Observable<any> {
    let userPayload = {
      "id": user.id,
      "firstName": user.firstName,
      "surname": user.lastName,
      "email": user.email,
      "userCredentials": {
        "id": user.dhisCredentialsId,
        "username": user.username,
        "password": user.password,
        "userRoles": [
          {
            "id": user.dhisRoleId
          }
        ]
      },
      "organisationUnits": [
        {
          "id": user.dhisOrganisationUnitId
        }
      ],
      "dataViewOrganisationUnits": [
        {
          "id": user.dhisOrganisationUnitId
        }
      ]
    };
    return Observable.create((observer: any) => {
      this.httpClient.post('users', userPayload).subscribe((response) => {
        this.dataStoreService.saveData(this.datastorePath, userPayload['id'], {
          id: user.id,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          organisation: user.organisation,
          role: user.role,
          roleId: user.roleId,
          dhisOrganisationUnitId: user.dhisOrganisationUnitId,
          dhisCredentialsId: user.dhisCredentialsId,
          dhisRoleId: user.dhisRoleId,
          agency: user.agency,
          isAgencyUser: user.isAgencyUser,
          isOrganisationUser: user.isOrganisationUser,
          isSuperUser: user.isSuperUser,
          organizationId: user.organizationId,
          agencyId: user.agencyId
        }).subscribe(results => {
          this.store.dispatch(new LoadUsers());
          observer.next(results);
          observer.complete();
        }, error => {
          observer.error(error);
          observer.complete();
        });
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  saveRole(role: UserRole) {
    return this.dataService.save(role, `${Tables.UserRoles}/${role.id}`);
  }

  deleteUser(user: User): Observable<any> {
    return Observable.create();
    // return this.dataService.delete(user, `${Tables.Users}/${user.id}`);
  }

  deleteRole(role: UserRole) {
    return this.dataService.delete(role, `${Tables.UserRoles}/${role.id}`);
  }
}
