import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  constructor(private http: HttpClientService) { }


  getData(path: string, key: string): Observable<any[]> {
    return new Observable(observer => {
      this.http.get(`dataStore/${path}/${key}`).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        },
        error => {
          if (error.statusText === 'Not Found') {
            observer.next([]);
            observer.complete();
          } else {
            observer.error();
          }
        }
      );
    });
  }

  /**
   * This method will help to save new data or update existing data to data store
   * @param path
   * @param key
   * @param data
   */
  saveData(path: string, key: string, data: any) {
    console.log("Outlet");
    return new Observable(observer => {
      // try to update the dataStore first
      this.http.put(`dataStore/${path}/${key}`, data).subscribe(
        result => {
          observer.next(result);
          observer.complete();
        },
        error => {
          // if there is an error and the error is that the key does not exist then create it
          if (error.message.indexOf('was not found in the namespace') > -1) {
            this.http.post(`dataStore/${path}/${key}`, data).subscribe(
              result => {
                observer.next(result);
                observer.complete();
              },
              error1 => observer.error(error1)
            );
          }
        }
      );
    });
  }

  /**
   * This function helps to delete data from dataStore
   * @param path
   * @param key
   */
  deleteData(path: string, key: string) {
    return new Observable(observer => {
      this.http.delete(`dataStore/${path}/${key}`).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        },
        error1 => observer.error(error1)
      );
    });
  }

}
