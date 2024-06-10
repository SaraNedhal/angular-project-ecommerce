import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  productMsg: undefined | string;
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: string) {
    console.warn(id);
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMsg = 'the product is deleted successfully';
        this.list();
      }
    });

    setTimeout(() => {
      this.productMsg = undefined;
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      console.warn(result);
      if (result) {
        this.productList = result;
      }
    });
  }
}
