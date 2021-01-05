import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { SourceService } from './source.service';
import { User } from 'src/app/store/user/reducers/user';
import { Upload } from '../../models/upload.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService implements SourceService {
  app = this.firestore.firestore.app;
  secondary_firestore: any;
  private basePath = '/uploads';
  constructor(
    public snackBar: MatSnackBar,
    private firestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth
  ) {
  }

  getFirestoreObject() {
    return this.firestore.firestore;
  }
  signUp(email: string, password: string) {
    return this.secondary_firestore.auth().createUserWithEmailAndPassword(email, password).then((firebaseUser: any) => {
      this.secondary_firestore.auth().signOut();
      return firebaseUser;
    });
  }
  deleteUser(email: string, password: string) {
    return this.secondary_firestore.auth().createUserWithEmailAndPassword(email, password).then((firebaseUser: any) => {
      this.secondary_firestore.auth().signOut();
      return firebaseUser;
    });
  }

  resetPassword(email: string) {
    return this.secondary_firestore.auth().sendPasswordResetEmail(email);
  }
  getLoggedInUser() {
    return Observable.create((observe: any) => {
      // check if the user is logged in
      this.app.auth().onAuthStateChanged((user) => {
        observe.next(user);
      });
    });
  }
  getCurrentUserObject(): Promise<any> {
    return this.firebaseAuth.currentUser;
  }
  sendPasswordResetEmail(email: string) {
    return this.firebaseAuth.sendPasswordResetEmail(email);
  }
  signIn(email: string, password: string) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    this.firebaseAuth.signOut();
  }

  showSuccess(message: string = 'Success') {
    this.snackBar.open(message, 'Ok', {
      duration: 2500,
      panelClass: 'success'
    });
  }

  showError(message: string = 'Operation Failed', duration: number = 2500) {
    this.snackBar.open(message, 'Ok', { duration, panelClass: 'error' });
  }

  showWarning(message: string = 'Something went wrong', duration: number = 2500) {
    this.snackBar.open(message, 'Ok', { duration, panelClass: 'warning' });
  }


  async getFixedItems(database_path: string, number: number, startItem: any = null, callback: Function) {
    const db = this.firestore.firestore;
    const query = db.collection(database_path);
    if ( startItem ) {
      query.startAfter(startItem);
    }
    query.limit(number);
    const documentSnapshots = await query.get();
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    callback(documentSnapshots.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    }));
    if ( documentSnapshots.docs.length === number ) {
      this.getFixedItems(database_path, number, lastVisible, callback);
      return false;
    } else {
      return true;
    }
  }

  getPagenatedItems(database_path: string, callback: Function) {

  }

  getItems(database_path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const db = this.firestore.firestore;
      db.collection(database_path).get()
      .then((querySnapshot) => {
        const itemArray: any[] = [];
        querySnapshot.forEach((doc) => {
          const item =  {
            id: doc.id,
            ...doc.data()
          };
          itemArray.push(item);
        });
        resolve(itemArray);
        // observer.complete();
      }, (error) => {
        reject(error);
        // observer.complete();
      });
    });
  }

  getOne(conditions:any, database_path: string) {
    return new Promise((resolve, reject) => {
      const db = this.firestore.firestore;
      db.collection(database_path)
      .where(conditions[0].left, conditions[0].operator, conditions[0].right)
      .get()
      .then((querySnapshot) => {

        let res = {};
        querySnapshot.forEach((doc) => {
          res = {
            id: doc.id,
            ...doc.data()
          };
        });
        resolve(res);
        // observer.complete();
      }).catch((error) => {
        reject(error);
        // observer.complete();
      });
    });
  }

  save(item: any, database_path: string) {
    return new Promise((resolve, reject) => {
      const db = this.firestore.firestore;
      db.doc(database_path).set({
        ...item
      }, { merge: true})
      .then(() => {
        resolve();
        // observer.complete();
      }, (error) => {
        reject(error);
        // observer.complete();
      });
    });
  }

  savedb(item: any, collection_path: string, doc_path: string) {
    return new Promise((resolve, reject) => {
      const db = this.firestore.firestore;
      db.collection(collection_path).doc(doc_path).set({
        ...item
      }, { merge: true})
        .then(() => {
          resolve();
          // observer.complete();
        }, (error) => {
          reject(error);
          // observer.complete();
        });
    });
  }

  delete(item: any, docPath: string) {
    return new Promise((resolve, reject) => {
      const db = this.firestore.firestore;
      db.doc(docPath)
      .delete()
      .then(() => {
        resolve();
        // observer.complete();
      }, (error) => {
        reject(error);
        // observer.complete();
      });
    });
  }

  pushUpload(upload: Upload, object: any) {
    const storageRef = firebase.default.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${object.id}`).put(upload.file);

    uploadTask.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
      (snapshot: any) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        storageRef.child(`${this.basePath}/${object.id}`).getDownloadURL()
          .then(url => {
            this.save(
              { sketch: url },
              `applications/${object.id}`
            );
          });
      }
    );
  }

  // generate a random list of Id for use as scorecard id
  makeid(): string {
    let text = '';
    const possible_combinations =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 11; i++) {
      text += possible_combinations.charAt(
        Math.floor(Math.random() * possible_combinations.length)
      );
    }
    return text;
  }
}
