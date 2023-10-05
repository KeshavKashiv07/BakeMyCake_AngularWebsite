import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RouterService } from '../services/router-service.service';
import { AuthService } from '../services/auth.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  constructor(private productService: ProductsService, private routService: RouterService, private authService: AuthService ,private liveAnnouncer: LiveAnnouncer) { }

  displayedColumns: string[] = ['deliveryDate', 'name', 'email', 'phoneNo', 'itemName', 'totalAmount', 'category', 'city'];
  orderHistory: MatTableDataSource<any>

  @ViewChild('paginator') paginator: MatPaginator;

  ngOnInit(): void {
    this.productService.getAllOrders().subscribe({
      next: data => {
        this.orderHistory = new MatTableDataSource(data);
        this.orderHistory.paginator = this.paginator;
        this.orderHistory.sort = this.sort;
      },
      error: err => {
        alert(err);
      }
    });
  }

  //applyFilter() to filter the Table data 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderHistory.filter = filterValue.trim().toLowerCase();
  }

  maxDate: Date = new Date();
  startDate: any = "";
  endDate: any = "";

  filterByDateRange() {
    if (this.startDate && this.endDate) {
      const filteredData = this.orderHistory.data.filter(item => {
        const deliveryDate = new Date(item.deliveryDate);
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);
        return deliveryDate >= startDate && deliveryDate <= endDate;
      });
      this.orderHistory.data = filteredData;
    }
    else {
      this.productService.getAllOrders().subscribe(data => {
        this.orderHistory = new MatTableDataSource(data);
        this.orderHistory.paginator = this.paginator;
      })
    }
  }

  //method for reset the date range data 
  resetDate() {
    this.startDate = '';
    this.endDate = '';
    this.filterByDateRange();
  }

  @ViewChild(MatSort) sort: MatSort;

  //sorting Mathod for date and prices
  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }


  loggedIn: boolean = false;
  logoutUser() {
    this.authService.logout();
    this.loggedIn = this.authService.isLoggedIn;
    this.routService.toHome()
  }

}
