import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products';
import { CustomerOrder } from '../models/customerOrder';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  products_url : string = "http://localhost:3000/products"
  orders_url : string = "http://localhost:3000/orders"
  
  constructor(private http : HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.products_url);
  }

  getItem(id?: number) : Observable<Product> {
    return this.http.get<Product>(`${this.products_url}/${id}`);
  }

  addOrder(OrderDetaills: CustomerOrder): Observable<CustomerOrder> {
    return this.http.post<CustomerOrder>(this.orders_url, OrderDetaills);
  }

  getAllOrders():Observable<CustomerOrder[]> {
    return this.http.get<CustomerOrder[]>(this.orders_url);
  }


}
