import { Component,Input, OnInit } from '@angular/core';
import { Product } from '../models/products';

@Component({
  selector: 'app-cake-cards',
  templateUrl: './cake-cards.component.html',
  styleUrls: ['./cake-cards.component.css']
})
export class CakeCardsComponent {

  @Input()
  product!: Product
}
