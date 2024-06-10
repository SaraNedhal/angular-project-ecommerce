import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMsg:string| undefined;
  constructor(private product:ProductService) { }

  ngOnInit(): void {
  }

  submit(formInfo: product ){
    console.warn(formInfo);
    this.product.addProduct(formInfo).subscribe((result)=>{
      console.warn(result);
      this.addProductMsg = "product is added successfully";
      
    });

    setTimeout(()=>{
      this.addProductMsg = undefined;
    } , 3000)
  }
}
