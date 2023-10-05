import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { PageNoteFoundComponent } from './page-note-found/page-note-found.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CanDeactivateGuard } from './services/can-deactivate.guard';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { canActivatedGuard } from './services/can-activated.guard';

export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "OrderView/:id",
    component: OrderViewComponent,
    canDeactivate:[CanDeactivateGuard]
  },
  {
    path: "admin-login",
    component: AdminLoginComponent
  },
  {
    path:"order-history",
    component: OrderHistoryComponent,
    canActivate: [canActivatedGuard]
  },  
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },  
  {
    path:"**",
    component:PageNoteFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
