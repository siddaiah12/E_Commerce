import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiResponseModel, CartData, Customer, LoginModel } from './model/products';
import { FormsModule } from '@angular/forms';
import { MasterService } from './service/master.service';
import { Constant } from './Const/const';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Ecommerce_app';
  registerObj:Customer= new Customer();
  loginObj:LoginModel=new LoginModel()
  logedUserData:Customer= new Customer();
  masterService=inject(MasterService)
  isCartPopupOpen:boolean=false;
  cartData:CartData[]=[]
@ViewChild("reisterModel")registerModel:ElementRef|undefined
@ViewChild("loginModel")loginModel:ElementRef|undefined

ngOnInit(): void {
  const isUser = localStorage.getItem(Constant.LOCAL_KEY)
  if(isUser !=null){
  const parseObj =JSON.parse(isUser)
  this.logedUserData=parseObj;
  this.getCartItems();
  }
  this.masterService.onCartAdded.subscribe((res:boolean)=>{
  if(res){
    this.getCartItems();
  }
  })
}
getCartItems(){
  this.masterService.GetCartProductsByCustomerId(this.logedUserData.custId).subscribe((res:ApiResponseModel)=>{
  this.cartData=res.data;
  })
}
deleteCartItem(cartId:number){
this.masterService.DeleteProductFromCartById(cartId).subscribe((res:ApiResponseModel)=>{
if(res.result){
  alert("Item delete from cart");
  this.getCartItems();
}else{
  alert(res.message);
}
})
}
showCartPopUp(){
this.isCartPopupOpen=!this.isCartPopupOpen;
}
logOut(){
  localStorage.removeItem(Constant.LOCAL_KEY);
  this.logedUserData= new Customer();
}
  openRegisterModel(){
    if(this.registerModel){
   this.registerModel.nativeElement.style.display="block"
    }
  }
  closeRegisterModel(){
    if(this.registerModel){
   this.registerModel.nativeElement.style.display="none"
    }
  }

  openLoginModel(){
    if(this.loginModel){
   this.loginModel.nativeElement.style.display="block"
    }
  }
  closeLoginModel(){
    if(this.loginModel){
   this.loginModel.nativeElement.style.display="none"
    }
  }

  onRegister(){
    debugger;
   this.masterService.registerCustomer(this.registerObj).subscribe((res:ApiResponseModel)=>{
   if(res.result){
    alert("Register Successfully!");
    this.closeRegisterModel();
   }else{
    alert(res.message)
   }
   })
  }

  onLogin(){
    debugger;
   this.masterService.loginCustomer(this.loginObj).subscribe((res:ApiResponseModel)=>{
   if(res.result){
    // alert("Register Successfully!");
    this.logedUserData=res.data
    localStorage.setItem(Constant.LOCAL_KEY,JSON.stringify(res.data))
    this.closeLoginModel();
   }else{
    alert(res.message)
   }
   })
  }
}
