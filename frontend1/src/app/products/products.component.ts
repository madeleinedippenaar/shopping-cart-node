import { Component, OnInit } from '@angular/core';
import { CartApiService } from '../services/cart-api.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public items: Item[] = [];
  show:boolean = false;

  constructor(private cartapiService : CartApiService) { }

  ngOnInit(): void {
    this.cartapiService.getAllItems().subscribe((items: Item[]) => {
      this.items = items;
    })
  };
  public addProduct(product: Item ) {
    this.cartapiService.addItem(product).subscribe((items: Item[]) => {
      this.items = items;
      this.show = !this.show;
      
    }); 
  };

   public deleteItem(id: number) {
    this.cartapiService.deleteItem(id).subscribe((items: Item[]) => {
      this.items = items;
      
    });
    
  };
  toggle() {
    this.show = !this.show;
  };
  
  
  }
  
