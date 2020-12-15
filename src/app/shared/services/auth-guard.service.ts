import { Injectable } from '@angular/core';
import { Routes, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from 'src/app/store/user/reducers/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user: User = new Function('return '+localStorage.getItem('sb-user'))();
    return route.data.roles.indexOf(user.roleId)>=0;
  }
  
}