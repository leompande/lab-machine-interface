import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {fadeIn} from '../shared/animations/router-animation';
import { User } from '../store/user/reducers/user';
import { UserService } from '../shared/services/model-services/user.service';
import { AuthService } from '../shared/services/firebase/auth-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeIn]
})
export class LoginComponent implements OnInit {
  loadedForm = 'login';

 
  user!: User;
  login_clicked = true;
  register_clicked = false;
  hide = true;
  new_password: any;
  confirm_password: any;
  password_not_equal = false;
  signingUp = false;

  loading = false;
  loginError = false;
  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  ngOnInit() {}

  onSignUp(user: User) {
    if (this.confirm_password !== this.new_password) {
      this.password_not_equal = true;
      setTimeout(() => {
        this.password_not_equal = false;
        }, 3000);
    } else {
      this.signingUp = true;
    }
    // this.authService.signupUser(user.email, this.new_password).then((data: any) => {
      // this.authService.temp_user = user;
      // this.dataStoreService.savedb('User')
    // });
  }

  onNavigate(data: any[]) {
    this.loadedForm = data[0];
    this.login_clicked = data[1].login_clicked;
    this.register_clicked = data[1].register_clicked;
  }

  saveUser(user: User) {
    // this.userService.saveUser(user)
    //   .then((data) => {
    //     console.log('user registered');
    //   })
    //   .catch((error) => console.log(error));
  }

  async login(username: string, password: string) {
    this.loading = true;
    try {
      const userData = await this.userService.login({username,password}).toPromise();
      
      // const userData = await this.dataStoreService.signIn(email, password);
      console.log(userData);

    } catch (e) {
      this.loading = false;
      // this.dataStoreService.showError('Incorrect Username or Password');
    }
  }

  attemptLogin(){
    document.getElementById('loginButton')?.click();
  }


}
