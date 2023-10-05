import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn: boolean = false;

  login(securityCode: string) {
    this.isLoggedIn = securityCode === "123";
  }

  logout() {
    this.isLoggedIn = false;
  }
}
