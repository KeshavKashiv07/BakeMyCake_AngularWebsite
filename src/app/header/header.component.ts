import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  title : string = "Bake My Cake"
  loggedIn:boolean = false

  constructor( private authService : AuthService , private routService : RouterService) {  }

  goAdminView() {
    this.authService.logout();
    this.loggedIn=this.authService.isLoggedIn;
    this.routService.toHome()
   }
    

}
