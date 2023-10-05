import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,RouterStateSnapshot,UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { RouterService } from './router-service.service';


@Injectable({
  providedIn: 'root'
})
export class canActivatedGuard implements CanActivate {

  constructor(private authService: AuthService, private routeService: RouterService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isLoggedIn) {
      this.routeService.toAdminLoginView();
      return false;
    }
    else
      return true;
  }
};
