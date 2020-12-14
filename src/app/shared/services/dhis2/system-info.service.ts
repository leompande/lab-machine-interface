import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { ManifestService } from './manifest.service';
import { map, switchMap, tap } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SystemInfoService {
  private _systemInfoLoaded: boolean;
  private _systemInfo: any;

  constructor(
    private manifestService: ManifestService,
    private httpClient: HttpClient
  ) {
    this._systemInfoLoaded = false;
  }

  getSystemInfo(): Observable<any> {
    return this._systemInfoLoaded
      ? of(this._systemInfo)
      : this.manifestService.getRootUrl().pipe(
        switchMap((rootUrl: string) =>
          forkJoin(this.getInfo(rootUrl), this.getSettings(rootUrl)).pipe(
            map((res: any[]) => {
              return { ...res[0], ...res[1] };
            }),
            tap((systemInfo: any) => {
              this._systemInfo = systemInfo;
              this._systemInfoLoaded = true;
            })
          )
        )
      );
  }

  getInfo(rootUrl: string) {
    return new Observable(observer => {
      this.httpClient.get(`${rootUrl}system/info`).subscribe(userInfo => {
        observer.next(userInfo);
        observer.complete();
      });
    });
  }

  getSettings(rootUrl: string) {
    return new Observable(observer => {
      this.httpClient
              .get(`${rootUrl}systemSettings`)
              .subscribe(userInfo => { 
                observer.next(userInfo);
                observer.complete();
              });
    });
  }

  public getSystemVersion(): Observable<number> {
    return this.getSystemInfo().pipe(
      map((systemInfo: any) => {
        if (!systemInfo) {
          return 0;
        }
        const splitedVersion = systemInfo.version
          ? systemInfo.version.split('.')
          : [];
        return parseInt(splitedVersion[1], 10) || 0;
      })
    );
  }
}
