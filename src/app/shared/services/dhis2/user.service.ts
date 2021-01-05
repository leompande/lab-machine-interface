import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';
import {first} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ManifestService } from './manifest.service';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import {Store} from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import { User } from 'src/app/store/user/reducers/user';
import { DatastoreService } from './datastore.service';
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
  constructor(
    private httpClient: HttpClientService,
    private http: HttpClient,
    private manifestService: ManifestService,
    private dataStoreService: DatastoreService,
    private store: Store<ApplicationState>
) {
  this.setUser();
}

setUser() {
  // this.user$ = this.loadCurrentUser().pipe(shareReplay(1));
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
    const   meUrl = 'me.json?fields=id,name,displayName,created,lastUpdated,email,dataViewOrganisationUnits[id,name,level,code,parent[id,name]],organisationUnits[id,code,name,level,parent[id,name]],userCredentials[username,userRoles[authorities]]';
    return new Observable(observer => {
      const token = this.prepareToken(credentials);
      authenticationtoken = token;
      this.removeLocalStorageItem('sb-web-token');
      const headers: HttpHeaders = this.createDHISAuthorizationHeader(token);
      this.manifestService.getRootUrl().
        subscribe(rootUrl => {
          this.http.get(rootUrl + meUrl,{
            headers: headers
          } )
            .subscribe((data: any) => {
              localStorage.setItem('sb-web-token', token);
              this.dataStoreService.getData('users',data.id).subscribe((userData: any)=>{
              localStorage.setItem('sb-user-id', data.id);
              localStorage.setItem('sb-user-organisation-unit', this.getUserOu(data));
              observer.next('Login successful..');
              observer.complete();
            });
            
            },
        error1 => {
          const errorMessage = error1.message;
          if ( errorMessage.indexOf('Unauthorized')) {
            observer.error('Incorrect Username or Password');
          } else if ( errorMessage.indexOf('unknown url')) {
            observer.error('There is no internet connection');
          } else {
            observer.error('There is problem with server please contact the administrator');
          }
        }
      );
    });
  });
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
    if (userData && userData.organisationUnits && userData.organisationUnits.length !== 0) {
      userOu = userData.organisationUnits[0].id;
    } else if (userData && userData.dataViewOrganisationUnits && userData.dataViewOrganisationUnits.length !== 0) {
      userOu = userData.dataViewOrganisationUnits[0].id;
    }
    return userOu;
  }
}
