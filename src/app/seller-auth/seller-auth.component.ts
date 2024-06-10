import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { login, signUp } from '../data-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller:SellerService ){}
  showLogin = false;
  authError:string = '';
  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signUp(formInfo : signUp):void{
    console.warn(formInfo);
    this.seller.userSignUp(formInfo);
  }

  openLogin(){
    this.showLogin = true;
  }

  openSignup(){
    this.showLogin = false;
  }

  login(formInfo : login):void{    
    this.seller.userLogin(formInfo);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        console.warn(isError);
        
        this.authError = "Email or password is not correct";

      }
      
    })
  }
}


