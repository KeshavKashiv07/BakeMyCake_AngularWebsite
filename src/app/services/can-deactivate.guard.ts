import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,CanDeactivate,RouterStateSnapshot, UrlTree } from '@angular/router';
import { OrderViewComponent } from '../order-view/order-view.component';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: OrderViewComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return component.canDeactivate ? component.canDeactivate() : true;
  }
  
}
