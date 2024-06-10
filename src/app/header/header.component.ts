import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType:string = 'default';
  sellerName:string = '';
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.route.events.subscribe((value:any)=>{
      if(value.url){
        // takes time to jump from a route to another thats why it shows undefined
        console.warn(value.url);
        // to check if the seller is logged in and the route include the keyword seller
        if(localStorage.getItem('seller') && value.url.includes('seller')){
          console.warn("this is seller area");
          let sellerStore = localStorage.getItem('seller'); 
          // turn the info of seller (sellerStore) from string to json format (object)
          if(sellerStore){
            let sellerData = JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }else{
            console.log("seller info are not found in the local storage");
          }
          this.menuType = 'seller'
          
        }else{
          console.warn("outside of seller area");
          this.menuType = 'default';
        }
      }
      
    })
  }

  logout(){
    localStorage.removeItem('seller');
    // redirect to home page
    this.route.navigate(['/'])
  }

}
