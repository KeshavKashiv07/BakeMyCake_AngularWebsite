import { Component } from '@angular/core';
import { Product } from '../models/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cake-list',
  templateUrl: './cake-list.component.html',
  styleUrls: ['./cake-list.component.css']
})
export class CakeListComponent {

  products: Product[] = [];
  search: any;
  filter: Product[];
  filterCategory: string = "";

  categories: string[] = ['All category', 'Cake', 'Cookies', 'Brownie'];

  constructor(private cakeService: ProductsService) { }

  ngOnInit(): void {
    this.cakeService.getAllProducts().subscribe({
      next: data => {
        this.products = data;
        this.search = data;
        this.filter = data;
      },
      error: err => {
        alert("Failure while connecting to server, try again!!");
      }
    });
  }

  filterByCategory(searchText: string) {
    if (searchText === "All category") {
      this.products = this.search;
      this.filter = this.products;
    }
    else {
      this.products = this.search;
      this.products = this.products.filter(product => {
        let category = product.category?.startsWith(searchText);
        return category;
      });
      this.filter = this.products;                    // this line for serarch method, means search bar can search only from filterd items.
    }
  }

  onSearchTextChanged(searchText: string) {
    if (searchText === '' || !searchText) {
      this.products = this.filter
    }
    else {
      const foundItem = this.filter.some(product => product.itemName?.startsWith(searchText));                           // some method give only true and false

      if (foundItem === true) {
        this.products = this.filter.filter(product => product.itemName?.startsWith(searchText));
      }
      else {
        this.products = [{
          itemName: "--",
          price: 0,
          category: "Unknown",
          image: "itemNotFound.png"
        }]
      }
    }
  }

}
