import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  constructor(private http: HttpClient) { }
  
  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>("http://localhost:3000/cart");
  }

  deleteItem(id:number): Observable<Item[]> {
    return this.http.delete<Item[]>(`http://localhost:3000/cart/${id}`);
  }

  addItem(item: Item): Observable<Item[]> {
    return this.http.post<Item[]>("http://localhost:3000/cart", item);
  }
}
