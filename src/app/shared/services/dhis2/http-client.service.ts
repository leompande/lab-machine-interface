import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { ManifestService } from './manifest.service';
import { SystemInfoService } from './system-info.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/internal/operators';

@Injectable({ providedIn: 'root' })
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    private manifestService: ManifestService,
    private systemInfoService: SystemInfoService
  ) {}

  createDHISAuthorizationHeader(token: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + token });
    return headers;
  }

  get(
    url: string,
    includeVersionNumber: boolean = false,
    preferPreviousApiVersion: boolean = false,
    useRootUrl: boolean = true
  ): Observable<any> {
    const rootUrlPromise = useRootUrl
      ? this.manifestService.getRootUrl()
      : this._getApiRootUrl(includeVersionNumber, preferPreviousApiVersion);
    const token = localStorage.getItem('sb-web-token');
    const headers: HttpHeaders = this.createDHISAuthorizationHeader(token);

    return rootUrlPromise.pipe(
      mergeMap(rootUrl => {
        return this.httpClient
          .get(rootUrl + url, { headers })
          .pipe(catchError(this._handleError));
      }),
      catchError(this._handleError)
    );
  }

  getBase(
    url: string,
    includeVersionNumber: boolean = false,
    preferPreviousApiVersion: boolean = false,
    useRootUrl: boolean = true
  ): Observable<any> {
    const rootUrlPromise = useRootUrl
      ? this.manifestService.getRootUrl()
      : this._getApiRootUrl(includeVersionNumber, preferPreviousApiVersion);
    const token = localStorage.getItem('sb-web-token');
    const headers: HttpHeaders = this.createDHISAuthorizationHeader(token);

    return rootUrlPromise.pipe(
      mergeMap(rootUrl => {
        const newUrl = rootUrl.replace('/api', '');
        return this.httpClient
          .get(newUrl + url, { headers })
          .pipe(catchError(this._handleError));
      }),
      catchError(this._handleError)
    );
  }

  post(
    url: string,
    data: any,
    includeVersionNumber: boolean = false,
    preferPreviousApiVersion: boolean = false,
    useRootUrl: boolean = true,
    headerOptions?: any
  ) {
    const rootUrlPromise = useRootUrl
      ? this.manifestService.getRootUrl()
      : this._getApiRootUrl(includeVersionNumber, preferPreviousApiVersion);
    const token = localStorage.getItem('sb-web-token');
    const headers: HttpHeaders = this.createDHISAuthorizationHeader(token);
    return rootUrlPromise.pipe(
      mergeMap(rootUrl =>
        this.httpClient
          .post(rootUrl + url, data, { headers })
          .pipe(catchError(this._handleError))
      ),
      catchError(this._handleError)
    );
  }

  put(
    url: string,
    data: any,
    includeVersionNumber: boolean = false,
    preferPreviousApiVersion: boolean = false,
    useRootUrl: boolean = true
  ) {
    const rootUrlPromise = useRootUrl
      ? this.manifestService.getRootUrl()
      : this._getApiRootUrl(includeVersionNumber, preferPreviousApiVersion);
    const token = localStorage.getItem('sb-web-token');
    const headers: HttpHeaders = this.createDHISAuthorizationHeader(token);
    return rootUrlPromise.pipe(
      mergeMap(rootUrl =>
        this.httpClient
          .put(rootUrl + url, data, { headers })
          .pipe(catchError(this._handleError))
      ),
      catchError(this._handleError)
    );
  }

  delete(
    url: string,
    includeVersionNumber: boolean = false,
    preferPreviousApiVersion: boolean = false,
    useRootUrl: boolean = true
  ) {
    const rootUrlPromise = useRootUrl
      ? this.manifestService.getRootUrl()
      : this._getApiRootUrl(includeVersionNumber, preferPreviousApiVersion);
    const token = localStorage.getItem('sb-web-token');
    const headers: HttpHeaders = this.createDHISAuthorizationHeader(token);
    return rootUrlPromise.pipe(
      mergeMap(rootUrl =>
        this.httpClient
          .delete(rootUrl + url, { headers })
          .pipe(catchError(this._handleError))
      ),
      catchError(this._handleError)
    );
  }

  // private methods
  private _handleError(err: HttpErrorResponse | any) {
    let error = null;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      error = {
        message: err.error,
        status: err.status,
        statusText: err.statusText
      };
    } else if (err['httpStatusCode']) {
      error = err;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      error = {
        dhis_error: err.dhis_error ? err.dhis_error : err.error,
        message:
          err.error instanceof Object
            ? err.error.message
            : err.error || err.message,
        status: err.status,
        statusText: err.statusText
      };
    }
    return throwError(error);
  }

  private _getApiRootUrl(
    includeVersionNumber: boolean = false,
    preferPreviousVersion: boolean = false
  ) {
    const rootUrlPromise = this.manifestService.getRootUrl();
    return rootUrlPromise;
  }
}
