import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import { Store } from '@ngrx/store';
import {formatDate} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/store/user/reducers/user';
import { ApplicationState } from 'src/app/store';
import { SourceService } from './source.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
   currentLoggedInUser: User | undefined;
  constructor(
    public snackBar: MatSnackBar,
    private dataSource: SourceService,
    private store: Store<ApplicationState>,
    private firestore: AngularFirestore,
    @Inject(LOCALE_ID) private locale: string,
  ) {
  //  this.store.select(selectCurrentUser).subscribe((user: User) => this.currentLoggedInUser = user);
  }

  // generate a random list of Id for use as scorecard id
  makeid(): string {
    let text = '';
    const possible_combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 11; i++ ) {
      text += possible_combinations.charAt(Math.floor(Math.random() * possible_combinations.length));
    }
    return text;
  }

  getFixedItems(itemArray: any[], database_path: string, doneAction: any, callback: Function) {
    if (itemArray.length === 0) {
      this.dataSource.getFixedItems(
        database_path,
        20,
        null,
        (items: any[]) => {
          callback(items);
        }).then (done => {
        if (done) { this.store.dispatch(doneAction); }
      });
    } else {
      this.store.dispatch(doneAction);
    }
  }

  getItems(itemArray: any[], database_path: string, doneAction: any, callback: Function) {
    if (itemArray.length === 0) {
      this.dataSource.getItems(database_path).then((items) => {
        items.forEach((item: any) => {
          itemArray.push(item);
          callback(item);
        });
        this.store.dispatch(doneAction);
      }, (error) => {
        // this.snackBar.open(JSON.stringify(error), '', {
        //   duration: 5000,
        // });
      });
    } else {
      this.store.dispatch(doneAction);
    }
  }
  getOne(conditions: any, database_path: string, doneAction: any, callback: Function) {
    return this.dataSource.getOne(conditions, database_path).then((user) => {
      callback(user);
      this.store.dispatch(doneAction);
      return user;
    });
  }

  save(item: any, docPath: string) {
    const db = this.firestore;
    return db.doc(docPath).set({
      ...item
    }, { merge: true});
  }

  delete(item: any, docPath: string) {
    return this.dataSource.delete(item, docPath);
  }

  convertToFirestoreObject(object: any) {
    if (object instanceof Array) {
      object.forEach((val) => {
        this.convertToFirestoreObject(val);
      });
    } else {
      // Object.entries(object).forEach((entry) => {
      //   if (object[entry[0]] === undefined) {
      //     object[entry[0]] = '';
      //   } else if (object[entry[0]] instanceof Date) {
      //     object[entry[0]] = object[entry[0]].toISOString().substr(0, 10);
      //   } else if (object[entry[0]] instanceof Array) {
      //     this.convertToFirestoreObject(object[entry[0]]);
      //   }
      // });
    }
  }

  dformatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  convertDate(data = new Date().toISOString()) {
    const converted_date = new Date(data);
    converted_date.setDate(converted_date.getDate() + 1);
    return converted_date.toISOString().substr(0, 10);
  }

  transformDate(date: any, format = 'yyyy-MM-dd') {
    return formatDate(date, format, this.locale);
  }

  transformDateAndTime(date: any) {
    return formatDate(date, 'yyyy-MM-dd HH:mm', this.locale);
  }
}
