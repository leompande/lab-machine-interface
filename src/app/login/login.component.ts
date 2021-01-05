import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fadeIn } from '../shared/animations/router-animation';
import { User } from '../store/user/reducers/user';
import { UserService } from '../shared/services/model-services/user.service';


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

  ngOnInit() { }

  onSignUp(user: User) {
    if (this.confirm_password !== this.new_password) {
      this.password_not_equal = true;
      setTimeout(() => {
        this.password_not_equal = false;
      }, 3000);
    } else {
      this.signingUp = true;
    }
  }

  onNavigate(data: any[]) {
    this.loadedForm = data[0];
    this.login_clicked = data[1].login_clicked;
    this.register_clicked = data[1].register_clicked;
  }

  saveUser(user: User) {
  }

  async login(username: string, password: string) {
    this.loading = true;
    try {
      const userData = await this.userService.login({ username, password }).toPromise();
    } catch (e) {
      this.loading = false;
    }
  }

  attemptLogin() {
    document.getElementById('loginButton')?.click();
  }


}
