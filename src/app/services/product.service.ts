import { Injectable } from '@angular/core';
import { product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  addProduct(formInfo: product){
    return this.http.post("http://localhost:3000/products" , formInfo );
  }

  productList(){
    return this.http.get<product[]>("http://localhost:3000/products");
  }

  deleteProduct(id:string){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
}
