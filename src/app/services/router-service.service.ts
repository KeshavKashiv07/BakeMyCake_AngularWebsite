import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private routerService: Router) { }

  toHome() {
    this.routerService.navigate([""]);
  }

  toOrderHistory() {
    this.routerService.navigate(["order-history"]);
  }

  toAdminLoginView() {
    this.routerService.navigate(["admin-login"]);
  }
}
