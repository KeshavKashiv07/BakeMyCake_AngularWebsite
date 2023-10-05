import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(private authService: AuthService, private routeService: RouterService, private snackbar: MatSnackBar) { }

  code: string = "";

  validateAdminCode() {
    this.authService.login(this.code);
    if (this.authService.isLoggedIn) {
      this.routeService.toOrderHistory();

      this.snackbar.open("Admin successfully LoggedIn !!", "success", {
        duration: 3000,
        panelClass: ['mat-primary', 'mat-toolbar']
      })
    }
    else {
      this.snackbar.open("Invalid Admin Code !!!", "Failure", {
        duration: 1500,
        panelClass: ['mat-toolbar', 'mat-accent']
      })
    }
  }

}
