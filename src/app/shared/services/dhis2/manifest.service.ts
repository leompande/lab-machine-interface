import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/internal/operators';

export interface Manifest {
  name: string;
  version: number | string;
  description: string;
  launch_path: string;
  appType: string;
  icons: {
    16: string;
    48: string;
    128: string;
  };
  developer: {
    name: string;
    url: string;
  };
  default_locale: string;
  activities: {
    dhis: {
      href: string;
      namespace: string;
    };
  };
  authorities: Array<string>;
}


@Injectable({providedIn: 'root'})
export class ManifestService {
  private _manifest!: Manifest;
  private _defaultRootUrl: string;
  private _manifestLoaded: boolean;

  constructor(private httpClient: HttpClient) {
    this._defaultRootUrl = '/api/';
    this._manifestLoaded = false;
  }

  public getManifest(): Observable<Manifest> {
    return this._manifestLoaded ? of(this._manifest) : this.httpClient.get<Manifest>('../manifest.webapp').pipe(
      catchError(() => {
        console.warn('Manifest file could not be loaded, default options have been used instead');
        return of(null);
      }),
      tap((manifest) => {
        this._manifest = manifest;
        this._manifestLoaded = true;
      }));
  }

  public getRootUrl(): Observable<string> {
    return this.getManifest().pipe(map((manifest: Manifest) => {
      if (!manifest) {
        return this._defaultRootUrl;
      }
      return manifest.activities && manifest.activities.dhis && manifest.activities.dhis.href ?
        manifest.activities.dhis.href : this._defaultRootUrl;
    }));
  }
}
