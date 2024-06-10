import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { login, signUp } from '../data-type';
import { log } from 'console';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { SellerAuthComponent } from '../seller-auth/seller-auth.component';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
isSellerLoggedIn = new BehaviorSubject<boolean>(false);
isLoginError = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(formInfo: signUp){
 this.http.post('http://localhost:3000/seller' , formInfo , {observe: 'response'}).subscribe((result)=>{
  console.warn(result);
  if(result){
    this.isSellerLoggedIn.next(true);
    localStorage.setItem('seller', JSON.stringify(result.body));
    this.router.navigate(['seller-home']);
  }
  
})
}

reloadSeller(){
  if(localStorage.getItem('seller')){
    this.isSellerLoggedIn.next(true);
    this.router.navigate(['seller-home']);
  }
}

userLogin(formInfo: login){
  this.http.get(`http://localhost:3000/seller?email=${formInfo.email}&password=${formInfo.password}` , {observe: 'response'}).subscribe((result: any)=>{
    console.log(result);
    
    if(result && result.body[0] && result.body.length===1 && result.body[0].password == formInfo.password && result.body[0].email == formInfo.email){
     this.isLoginError.emit(false);
      localStorage.setItem('seller', JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
    }else{
      console.warn("login failed.");
      this.isLoginError.emit(true);
      
    }
    console.log(result);
    
  })
  // console.warn(formInfo);
  
}

}
