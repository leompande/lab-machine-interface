import { Injectable } from '@angular/core';
import { User } from 'src/app/store/user/reducers/user';
import { UserRole } from 'src/app/store/user-role/reducers/user-role';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import { DataService } from '../data.service';
import { DoneLoagingUsers, UpsertUser } from 'src/app/store/user/actions/user.actions';
import { UpsertUserRole, DoneLoagingUserRoles } from 'src/app/store/user-role/actions/user-role.actions';
import { Tables } from '../../tables.database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _users: User[] = [];
  _userRoles: UserRole[] = [];
  constructor(
    private store: Store<ApplicationState>,
    private dataService: DataService
  ) { }

  getUsers() {
    this.dataService.getItems(
      this._users,
      Tables.Users,
      new DoneLoagingUsers(),
      (item: User) => {
        this.store.dispatch(new UpsertUser({User: item}));
      });
  }

  getUser(email: string) {
    return this.dataService.getOne(
      [{left: 'email', operator: '==', right: email}],
      Tables.Users,
      new DoneLoagingUsers(),
      (item: User) => {
        this.store.dispatch(new UpsertUser({User: item}));
      });
  }

  getRoles() {
    this.dataService.getItems(
      this._userRoles,
      Tables.UserRoles,
      new DoneLoagingUserRoles(),
      (item: UserRole) => {
        this.store.dispatch(new UpsertUserRole({UserRole: item}));
      });
  }

  saveUser(user: User) {
    return this.dataService.save(user, `${Tables.Users}/${user.id}`);
  }

  saveRole(role: UserRole) {
    return this.dataService.save(role, `${Tables.UserRoles}/${role.id}`);
  }

  deleteUser(user: User) {
    return this.dataService.delete(user, `${Tables.Users}/${user.id}`);
  }

  deleteRole(role: UserRole) {
    return this.dataService.delete(role, `${Tables.UserRoles}/${role.id}`);
  }
}
