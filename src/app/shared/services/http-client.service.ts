import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  get(url): Observable<any> {
    return Observable.create((observer) => {
      this.http.get(url).subscribe((response) => {
        observer.next(response);
        observer.complete();
      }, (error) => {
        observer.error();
        observer.complete();
      });
    });
  }

  post(url, data): Observable<any> {
    return Observable.create((observer) => {
      this.http.post(url, data).subscribe((response) => {
        observer.next(response);
        observer.complete();
      }, (error) => {
        observer.error();
        observer.complete();
      });
    });
  }

  put(url, data): Observable<any> {
    return Observable.create((observer) => {
      this.http.put(url, data).subscribe((response) => {
        observer.next(response);
        observer.complete();
      }, (error) => {
        observer.error();
        observer.complete();
      });
    });
  }

  delete(url): Observable<any> {
    return Observable.create((observer) => {
      this.http.delete(url).subscribe((response) => {
        observer.next(response);
        observer.complete();
      }, (error) => {
        observer.error();
        observer.complete();
      });
    });
  }
}
