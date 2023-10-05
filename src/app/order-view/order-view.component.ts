import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/products';
import { CustomerOrder } from '../models/customerOrder';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterService } from '../services/router-service.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  submitStatus: boolean = false;

  stars: Array<number> = [];
  weightValues: string[] = ["0.5 kg", "1 kg", "1.5 kg", "2 kg", "2.5 kg"];
  paymentMod: string[] = ["COD", "UPI", "Net Banking", "Credit Card", "Debit Card"];

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService, private snackBar: MatSnackBar, private routeService: RouterService) { }

  item: Product = {}
  order: CustomerOrder = {};

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get("id") ?? 0;
      this.productService.getItem(+id).subscribe(data => {
        this.item = data;
        this.stars = new Array(this.item.rating);
        this.submitStatus = false;        // if submitStatus is false then is showing confirm box, if it is true it is not showing
      })
    });
  }

  
  orderSubmit(orderForm: any) {
    this.order.category = this.item.category;
    this.order.itemName = this.item.itemName;

    this.productService.addOrder(this.order).subscribe({
      next: data => {
        this.snackBar.open('Detaills submitted successfully', 'order success', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        })
        this.submitStatus = true;
        this.routeService.toHome();
      },
      error: err => {
        alert("Failure while connecting to server, try again!!");
      }
    })
  }


  calculateTotalAmount(): void {
    if (this.item.category === "Cake") {                                     // if block is execute when user can select only cake
      if (this.order.quantity >= 1) {
        if (this.order.weight === "0.5 kg") {
          this.order.totalAmount = (this.item.price / 2) * this.order.quantity;
        }
        else if (this.order.weight === "1 kg") {
          this.order.totalAmount = (this.item.price * 1) * this.order.quantity;
        }
        else if (this.order.weight === "1.5 kg") {
          this.order.totalAmount = (this.item.price * 1.5) * this.order.quantity;
        }
        else if (this.order.weight === "2 kg") {
          this.order.totalAmount = (this.item.price * 2) * this.order.quantity;
        }
        else if (this.order.weight === "2.5 kg") {
          this.order.totalAmount = (this.item.price * 2.5) * this.order.quantity;
        }
        else {
          this.order.totalAmount = this.item.price * this.order.quantity;
        }
      }
      else {
        this.order.totalAmount = 0;
      }
    }
    else {                                                           // else part execute when user can select a cookies or brownies
      if (this.order.quantity >= 1) {
        this.order.totalAmount = this.item.price * this.order.quantity
      }
      else {
        this.order.totalAmount = 0;
      }
    }
  }

  canDeactivate() {
    if (!this.submitStatus)
      this.submitStatus = confirm("You have not submitted a request to this order. Any details entered will be lost. Are you sure you want to leave?");
    return this.submitStatus;
  }

  minDate: Date = new Date();
  selectedDate: Date;

  onDateSelected() {
    const selectedDateObject = new Date(this.selectedDate);
    selectedDateObject.setDate(selectedDateObject.getDate() - -1);                     // Add one day from the selected date becaus its selecting one day before date   
    const formattedDate = selectedDateObject.toISOString().split('T')[0];              // Convert the updated date object back to a string in "YYYY-MM-DD" format

    this.order.deliveryDate = formattedDate;
  }
}