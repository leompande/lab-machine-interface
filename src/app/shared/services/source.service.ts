import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { User } from 'src/app/store/user/reducers/user';

@Injectable({
  providedIn: 'root'
})
export abstract class SourceService {

  constructor() { }

  abstract getCurrentUserObject(): Promise<User>;
  abstract sendPasswordResetEmail(email: string): any;
  abstract signIn(email: string, password: string): Promise<any>;
  abstract logout(): void;
  abstract signUp(email: string, password: string): Promise<any>;
  abstract deleteUser(email: string, password: string): any;
  abstract getOne(conditions: any, database_path: string): Promise<any>;
  abstract getItems(database_path: string): Promise<any>;
  abstract save(item: any, database_path: string): Promise<any>;
  abstract getLoggedInUser(): Observable<any>;
  abstract delete(item: any, database_path: string): Promise<any>;
  abstract getFixedItems(database_path: string, number: number, startItem: any, callback: Function): Promise<any>;
}
