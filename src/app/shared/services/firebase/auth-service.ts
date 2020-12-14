import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FirebaseDataService } from './firebase-data.service';
import { UserService } from '../model-services/user.service';
interface User {
  uid: string;
  firstName: string;
  surName: string;
  phoneNumber: string;
  address: string;
  email: string;
  user_level: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: Observable<User>;
  form!: FormGroup;
  temp_user = null;

  constructor(
    private firebaseService: FirebaseDataService,
    public router: Router,
    private userService: UserService
  ) {

  }

  async signupUser(email: string, password: string) {
    firebase.default.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  async  login(email: string, password: string) {
    try {
      const userData = await this.firebaseService.signIn(email, password);
      this.router.navigate(['/dashboard']);
    } catch (e) {
      alert('Error!' + e.message);
    }
  }

  async logout() {
    await this.firebaseService.logout();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
}

